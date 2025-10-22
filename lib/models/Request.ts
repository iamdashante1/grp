import mongoose, { Document, Schema, Model } from 'mongoose';

interface IHospitalAddress {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

interface IHospital {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address?: IHospitalAddress;
  licenseNumber?: string;
}

interface IPatientInfo {
  patientId?: string;
  age?: number;
  gender?: string;
  diagnosis?: string;
  doctorName?: string;
}

interface ICommunication {
  message: string;
  sentBy: mongoose.Types.ObjectId;
  sentAt: Date;
  type: 'update' | 'question' | 'clarification' | 'approval' | 'rejection';
}

interface IFulfillmentDonation {
  donation: mongoose.Types.ObjectId;
  volumeMl: number;
  assignedAt?: Date;
}

interface IFulfillment {
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  rejectionReason?: string;
  volumeApprovedMl?: number;
  unitsApproved?: number;
  donations?: IFulfillmentDonation[];
  dispatchedAt?: Date;
  receivedAt?: Date;
  receivedBy?: string;
}

interface ITimeRemaining {
  milliseconds: number;
  hours: number;
  isOverdue: boolean;
}

export interface IRequest extends Document {
  requestId: string;
  hospital: IHospital;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  volumeRequestedMl: number;
  unitsRequested: number;
  urgency: 'routine' | 'urgent' | 'emergency';
  reason: 'surgery' | 'trauma' | 'cancer_treatment' | 'chronic_anemia' | 'childbirth' | 'organ_transplant' | 'emergency' | 'other';
  patientInfo?: IPatientInfo;
  requiredBy: Date;
  status: 'pending' | 'reviewing' | 'approved' | 'partially_fulfilled' | 'fulfilled' | 'rejected' | 'cancelled' | 'expired';
  fulfillment: IFulfillment;
  priority: number;
  notes?: string;
  communication?: ICommunication[];
  createdAt: Date;
  updatedAt: Date;
  timeRemaining: ITimeRemaining | null;
  fulfillmentPercentage: number;
  isOverdue(): boolean;
  calculatePriorityScore(): number;
}

const requestSchema = new Schema<IRequest>({
  requestId: {
    type: String,
    unique: true,
    required: true
  },
  hospital: {
    name: {
      type: String,
      required: [true, 'Hospital name is required']
    },
    contactPerson: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
    licenseNumber: String
  },
  bloodType: {
    type: String,
    required: [true, 'Blood type is required'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  volumeRequestedMl: {
    type: Number,
    required: [true, 'Requested volume is required'],
    min: [250, 'Minimum request volume is 250ml']
  },
  unitsRequested: {
    type: Number,
    required: true,
    min: 1
  },
  urgency: {
    type: String,
    enum: ['routine', 'urgent', 'emergency'],
    default: 'routine'
  },
  reason: {
    type: String,
    required: [true, 'Reason for request is required'],
    enum: [
      'surgery',
      'trauma',
      'cancer_treatment',
      'chronic_anemia',
      'childbirth',
      'organ_transplant',
      'emergency',
      'other'
    ]
  },
  patientInfo: {
    patientId: String,
    age: Number,
    gender: String,
    diagnosis: String,
    doctorName: String
  },
  requiredBy: {
    type: Date,
    required: [true, 'Required by date is required']
  },
  status: {
    type: String,
    enum: [
      'pending',
      'reviewing',
      'approved',
      'partially_fulfilled',
      'fulfilled',
      'rejected',
      'cancelled',
      'expired'
    ],
    default: 'pending'
  },
  fulfillment: {
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    approvedAt: Date,
    rejectionReason: String,
    volumeApprovedMl: Number,
    unitsApproved: Number,
    donations: [{
      donation: {
        type: Schema.Types.ObjectId,
        ref: 'Donation'
      },
      volumeMl: Number,
      assignedAt: Date
    }],
    dispatchedAt: Date,
    receivedAt: Date,
    receivedBy: String
  },
  priority: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  communication: [{
    message: String,
    sentBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    sentAt: {
      type: Date,
      default: Date.now
    },
    type: {
      type: String,
      enum: ['update', 'question', 'clarification', 'approval', 'rejection']
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
requestSchema.index({ status: 1, urgency: -1, createdAt: -1 });
requestSchema.index({ bloodType: 1, status: 1 });
requestSchema.index({ requiredBy: 1, status: 1 });

// Virtual for time remaining
requestSchema.virtual('timeRemaining').get(function(): ITimeRemaining | null {
  if (this.status === 'fulfilled' || this.status === 'cancelled') return null;
  
  const now = new Date();
  const remainingMs = this.requiredBy.getTime() - now.getTime();
  const remainingHours = Math.ceil(remainingMs / (1000 * 60 * 60));
  
  return {
    milliseconds: remainingMs,
    hours: remainingHours,
    isOverdue: remainingMs < 0
  };
});

// Virtual for fulfillment percentage
requestSchema.virtual('fulfillmentPercentage').get(function(): number {
  if (!this.fulfillment.volumeApprovedMl) return 0;
  return Math.round((this.fulfillment.volumeApprovedMl / this.volumeRequestedMl) * 100);
});

// Method to check if request is overdue
requestSchema.methods.isOverdue = function(): boolean {
  return new Date() > this.requiredBy && !['fulfilled', 'cancelled'].includes(this.status);
};

// Method to calculate priority score
requestSchema.methods.calculatePriorityScore = function(): number {
  let score = this.priority * 10;
  
  // Urgency multiplier
  const urgencyMultipliers: Record<string, number> = {
    'emergency': 3,
    'urgent': 2,
    'routine': 1
  };
  score *= urgencyMultipliers[this.urgency] || 1;
  
  // Time factor (closer to deadline = higher priority)
  const hoursRemaining = (this.requiredBy.getTime() - new Date().getTime()) / (1000 * 60 * 60);
  if (hoursRemaining <= 4) score *= 3;
  else if (hoursRemaining <= 24) score *= 2;
  
  return score;
};

// Pre-save middleware to generate request ID
requestSchema.pre('save', function(next) {
  if (this.isNew) {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const timeStr = date.toTimeString().slice(0, 8).replace(/:/g, '');
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.requestId = `REQ-${dateStr}-${timeStr}-${random}`;
  }
  next();
});

// Pre-save middleware to update status based on time
requestSchema.pre('save', function(next) {
  if (this.isOverdue() && this.status === 'pending') {
    this.status = 'expired';
  }
  next();
});

const Request: Model<IRequest> = mongoose.models.Request || mongoose.model<IRequest>('Request', requestSchema);

export default Request;
