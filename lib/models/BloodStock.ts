import mongoose, { Document, Schema, Model } from 'mongoose';

interface IUnit {
  unitNumber: string;
  donationId: mongoose.Types.ObjectId;
  collectionDate: Date;
  expiryDate: Date;
  status: 'available' | 'reserved' | 'dispatched' | 'expired' | 'discarded';
  reservedFor?: mongoose.Types.ObjectId;
  reservedAt?: Date;
  dispatchedTo?: string;
  dispatchedAt?: Date;
  notes?: string;
}

interface IThresholds {
  critical: number;
  low: number;
  optimal: number;
}

export interface IBloodStock extends Document {
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  units: IUnit[];
  thresholds: IThresholds;
  lastUpdated: Date;
  totalUnits: number;
  availableUnits: number;
  reservedUnits: number;
  expiredUnits: number;
  stockStatus: 'critical' | 'low' | 'optimal' | 'surplus';
  compatibleTypes: string[];
  canDonateTo: string[];
  canReceiveFrom: string[];
  addStock(unitData: Partial<IUnit>): Promise<void>;
  reserveStock(requestId: mongoose.Types.ObjectId, quantity: number): Promise<boolean>;
  dispatchStock(unitNumbers: string[], destination: string): Promise<void>;
  markExpired(): Promise<number>;
  checkThresholds(): void;
}

const unitSchema = new Schema<IUnit>({
  unitNumber: {
    type: String,
    required: true,
    unique: true
  },
  donationId: {
    type: Schema.Types.ObjectId,
    ref: 'Donation',
    required: true
  },
  collectionDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'reserved', 'dispatched', 'expired', 'discarded'],
    default: 'available'
  },
  reservedFor: {
    type: Schema.Types.ObjectId,
    ref: 'Request'
  },
  reservedAt: Date,
  dispatchedTo: String,
  dispatchedAt: Date,
  notes: String
}, { _id: false });

const bloodStockSchema = new Schema<IBloodStock>({
  bloodType: {
    type: String,
    required: true,
    unique: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  units: [unitSchema],
  thresholds: {
    critical: {
      type: Number,
      default: 5
    },
    low: {
      type: Number,
      default: 10
    },
    optimal: {
      type: Number,
      default: 20
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual: Total units
bloodStockSchema.virtual('totalUnits').get(function() {
  return this.units.length;
});

// Virtual: Available units
bloodStockSchema.virtual('availableUnits').get(function() {
  return this.units.filter(u => u.status === 'available').length;
});

// Virtual: Reserved units
bloodStockSchema.virtual('reservedUnits').get(function() {
  return this.units.filter(u => u.status === 'reserved').length;
});

// Virtual: Expired units
bloodStockSchema.virtual('expiredUnits').get(function() {
  return this.units.filter(u => u.status === 'expired').length;
});

// Virtual: Stock status based on thresholds
bloodStockSchema.virtual('stockStatus').get(function() {
  const available = this.availableUnits;
  if (available <= this.thresholds.critical) return 'critical';
  if (available <= this.thresholds.low) return 'low';
  if (available >= this.thresholds.optimal) return 'optimal';
  return 'surplus';
});

// Blood compatibility matrix
const compatibilityMatrix: Record<string, { canDonateTo: string[], canReceiveFrom: string[] }> = {
  'O-': { canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], canReceiveFrom: ['O-'] },
  'O+': { canDonateTo: ['O+', 'A+', 'B+', 'AB+'], canReceiveFrom: ['O-', 'O+'] },
  'A-': { canDonateTo: ['A-', 'A+', 'AB-', 'AB+'], canReceiveFrom: ['O-', 'A-'] },
  'A+': { canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['O-', 'O+', 'A-', 'A+'] },
  'B-': { canDonateTo: ['B-', 'B+', 'AB-', 'AB+'], canReceiveFrom: ['O-', 'B-'] },
  'B+': { canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['O-', 'O+', 'B-', 'B+'] },
  'AB-': { canDonateTo: ['AB-', 'AB+'], canReceiveFrom: ['O-', 'A-', 'B-', 'AB-'] },
  'AB+': { canDonateTo: ['AB+'], canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] }
};

// Virtual: Compatible blood types
bloodStockSchema.virtual('compatibleTypes').get(function() {
  return compatibilityMatrix[this.bloodType]?.canReceiveFrom || [];
});

bloodStockSchema.virtual('canDonateTo').get(function() {
  return compatibilityMatrix[this.bloodType]?.canDonateTo || [];
});

bloodStockSchema.virtual('canReceiveFrom').get(function() {
  return compatibilityMatrix[this.bloodType]?.canReceiveFrom || [];
});

// Add stock
bloodStockSchema.methods.addStock = async function(unitData: Partial<IUnit>): Promise<void> {
  const collectionDate = unitData.collectionDate || new Date();
  const expiryDate = new Date(collectionDate);
  expiryDate.setDate(expiryDate.getDate() + 42); // 42 days shelf life
  
  this.units.push({
    ...unitData,
    collectionDate,
    expiryDate,
    status: 'available'
  });
  
  this.lastUpdated = new Date();
  await this.save();
};

// Reserve stock
bloodStockSchema.methods.reserveStock = async function(requestId: mongoose.Types.ObjectId, quantity: number): Promise<boolean> {
  const availableUnits = this.units.filter((u: IUnit) => u.status === 'available');
  
  if (availableUnits.length < quantity) return false;
  
  for (let i = 0; i < quantity; i++) {
    availableUnits[i].status = 'reserved';
    availableUnits[i].reservedFor = requestId;
    availableUnits[i].reservedAt = new Date();
  }
  
  this.lastUpdated = new Date();
  await this.save();
  return true;
};

// Dispatch stock
bloodStockSchema.methods.dispatchStock = async function(unitNumbers: string[], destination: string): Promise<void> {
  const dispatchDate = new Date();
  
  this.units.forEach((unit: IUnit) => {
    if (unitNumbers.includes(unit.unitNumber)) {
      unit.status = 'dispatched';
      unit.dispatchedTo = destination;
      unit.dispatchedAt = dispatchDate;
    }
  });
  
  this.lastUpdated = new Date();
  await this.save();
};

// Mark expired units
bloodStockSchema.methods.markExpired = async function(): Promise<number> {
  const now = new Date();
  let count = 0;
  
  this.units.forEach((unit: IUnit) => {
    if (unit.status === 'available' && unit.expiryDate < now) {
      unit.status = 'expired';
      count++;
    }
  });
  
  if (count > 0) {
    this.lastUpdated = new Date();
    await this.save();
  }
  
  return count;
};

// Check thresholds and create notifications
bloodStockSchema.methods.checkThresholds = function(): void {
  // This would trigger notification creation in a real implementation
  const status = this.stockStatus;
  console.log(`Blood type ${this.bloodType} status: ${status}`);
};

// Pre-save middleware
bloodStockSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

const BloodStock: Model<IBloodStock> = mongoose.models.BloodStock || mongoose.model<IBloodStock>('BloodStock', bloodStockSchema);

export default BloodStock;
