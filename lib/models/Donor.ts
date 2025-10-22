import mongoose, { Document, Schema, Model } from 'mongoose';

interface ISurgery {
  procedure: string;
  date: Date;
}

interface IMedicalHistory {
  allergies?: string[];
  medications?: string[];
  chronicConditions?: string[];
  surgeries?: ISurgery[];
}

interface IEmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface IDonor extends Document {
  user: mongoose.Types.ObjectId;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  dateOfBirth: Date;
  weight: number;
  height: number;
  gender: 'male' | 'female' | 'other';
  lastDonationDate?: Date;
  totalDonations: number;
  medicalHistory?: IMedicalHistory;
  emergencyContact: IEmergencyContact;
  isEligible: boolean;
  eligibilityNotes?: string;
  nextEligibleDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  age: number;
  bmi: string;
  checkEligibility(): boolean;
  updateNextEligibleDate(): void;
}

const donorSchema = new Schema<IDonor>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bloodType: {
    type: String,
    required: [true, 'Blood type is required'],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [50, 'Weight must be at least 50 kg for donation']
  },
  height: {
    type: Number,
    required: [true, 'Height is required in cm']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other']
  },
  lastDonationDate: {
    type: Date
  },
  totalDonations: {
    type: Number,
    default: 0
  },
  medicalHistory: {
    allergies: [String],
    medications: [String],
    chronicConditions: [String],
    surgeries: [{
      procedure: String,
      date: Date
    }]
  },
  emergencyContact: {
    name: {
      type: String,
      required: true
    },
    relationship: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  isEligible: {
    type: Boolean,
    default: true
  },
  eligibilityNotes: String,
  nextEligibleDate: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Calculate age from date of birth
donorSchema.virtual('age').get(function() {
  return Math.floor((new Date().getTime() - this.dateOfBirth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
});

// Calculate BMI
donorSchema.virtual('bmi').get(function() {
  const heightInMeters = this.height / 100;
  return (this.weight / (heightInMeters * heightInMeters)).toFixed(1);
});

// Check if donor is eligible to donate (56 days gap for whole blood)
donorSchema.methods.checkEligibility = function(): boolean {
  if (!this.lastDonationDate) return true;
  
  const daysSinceLastDonation = (new Date().getTime() - this.lastDonationDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceLastDonation >= 56;
};

// Update next eligible date
donorSchema.methods.updateNextEligibleDate = function(): void {
  if (this.lastDonationDate) {
    const nextDate = new Date(this.lastDonationDate);
    nextDate.setDate(nextDate.getDate() + 56);
    this.nextEligibleDate = nextDate;
  }
};

// Pre-save middleware
donorSchema.pre('save', function(next) {
  if (this.isModified('lastDonationDate')) {
    this.updateNextEligibleDate();
  }
  next();
});

const Donor: Model<IDonor> = mongoose.models.Donor || mongoose.model<IDonor>('Donor', donorSchema);

export default Donor;
