import mongoose, { Document, Schema, Model } from 'mongoose';

interface IAdverseReaction {
  type: string;
  severity: 'mild' | 'moderate' | 'severe';
  notes?: string;
  reportedAt?: Date;
}

interface IPreScreening {
  hemoglobin: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  pulse: number;
  temperature: number;
  weight: number;
}

interface ITestResults {
  bloodTyping?: {
    abo?: string;
    rh?: string;
    confirmed?: boolean;
  };
  infectiousDiseases?: {
    hiv?: {
      tested?: boolean;
      result?: string;
      testDate?: Date;
    };
    hepatitisB?: {
      tested?: boolean;
      result?: string;
      testDate?: Date;
    };
    hepatitisC?: {
      tested?: boolean;
      result?: string;
      testDate?: Date;
    };
    syphilis?: {
      tested?: boolean;
      result?: string;
      testDate?: Date;
    };
  };
  additionalTests?: Array<{
    testName: string;
    result: string;
    testDate?: Date;
    notes?: string;
  }>;
}

interface IQCResults {
  approved?: boolean;
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  rejectionReason?: string;
  notes?: string;
}

interface IStorageInfo {
  bagId?: string;
  expirationDate?: Date;
  storageTemperature?: number;
  location?: string;
}

export interface IDonation extends Document {
  donor: mongoose.Types.ObjectId;
  appointment?: mongoose.Types.ObjectId;
  donationType: 'whole_blood' | 'plasma' | 'platelets' | 'double_red_cells';
  volumeMl: number;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  collectedBy: mongoose.Types.ObjectId;
  collectionDate: Date;
  location: string;
  preScreening: IPreScreening;
  testResults?: ITestResults;
  status: 'collected' | 'testing' | 'approved' | 'rejected' | 'expired';
  qcResults?: IQCResults;
  storageInfo: IStorageInfo;
  adverse_reactions?: IAdverseReaction[];
  createdAt: Date;
  updatedAt: Date;
  ageInDays: number;
  isExpired(): boolean;
}

const donationSchema = new Schema<IDonation>({
  donor: {
    type: Schema.Types.ObjectId,
    ref: 'Donor',
    required: true
  },
  appointment: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  donationType: {
    type: String,
    enum: ['whole_blood', 'plasma', 'platelets', 'double_red_cells'],
    required: true,
    default: 'whole_blood'
  },
  volumeMl: {
    type: Number,
    required: [true, 'Volume in ml is required'],
    min: [200, 'Minimum donation volume is 200ml'],
    max: [500, 'Maximum donation volume is 500ml']
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  collectedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collectionDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  location: {
    type: String,
    required: true
  },
  preScreening: {
    hemoglobin: {
      type: Number,
      required: true,
      min: 12.5
    },
    bloodPressure: {
      systolic: {
        type: Number,
        required: true,
        min: 90,
        max: 180
      },
      diastolic: {
        type: Number,
        required: true,
        min: 50,
        max: 100
      }
    },
    pulse: {
      type: Number,
      required: true,
      min: 50,
      max: 100
    },
    temperature: {
      type: Number,
      required: true,
      max: 37.5
    },
    weight: {
      type: Number,
      required: true,
      min: 50
    }
  },
  testResults: {
    bloodTyping: {
      abo: String,
      rh: String,
      confirmed: Boolean
    },
    infectiousDiseases: {
      hiv: {
        tested: Boolean,
        result: String,
        testDate: Date
      },
      hepatitisB: {
        tested: Boolean,
        result: String,
        testDate: Date
      },
      hepatitisC: {
        tested: Boolean,
        result: String,
        testDate: Date
      },
      syphilis: {
        tested: Boolean,
        result: String,
        testDate: Date
      }
    },
    additionalTests: [{
      testName: String,
      result: String,
      testDate: Date,
      notes: String
    }]
  },
  status: {
    type: String,
    enum: ['collected', 'testing', 'approved', 'rejected', 'expired'],
    default: 'collected'
  },
  qcResults: {
    approved: Boolean,
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    approvedAt: Date,
    rejectionReason: String,
    notes: String
  },
  storageInfo: {
    bagId: {
      type: String,
      unique: true,
      sparse: true
    },
    expirationDate: Date,
    storageTemperature: Number,
    location: String
  },
  adverse_reactions: [{
    type: String,
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe']
    },
    notes: String,
    reportedAt: Date
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
donationSchema.index({ donor: 1, collectionDate: -1 });
donationSchema.index({ bloodType: 1, status: 1 });
donationSchema.index({ 'storageInfo.bagId': 1 });

// Virtual for donation age in days
donationSchema.virtual('ageInDays').get(function() {
  return Math.floor((new Date().getTime() - this.collectionDate.getTime()) / (1000 * 60 * 60 * 24));
});

// Method to check if donation is expired
donationSchema.methods.isExpired = function(): boolean {
  if (!this.storageInfo.expirationDate) return false;
  return new Date() > this.storageInfo.expirationDate;
};

// Pre-save middleware to set expiration date
donationSchema.pre('save', function(next) {
  if (this.isNew && this.donationType === 'whole_blood') {
    const expirationDate = new Date(this.collectionDate);
    expirationDate.setDate(expirationDate.getDate() + 42); // 42 days for whole blood
    this.storageInfo.expirationDate = expirationDate;
  }
  next();
});

const Donation: Model<IDonation> = mongoose.models.Donation || mongoose.model<IDonation>('Donation', donationSchema);

export default Donation;
