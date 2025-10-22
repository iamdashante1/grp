import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IAppointment extends Document {
  donor: mongoose.Types.ObjectId;
  appointmentDate: Date;
  timeSlot: '09:00' | '10:00' | '11:00' | '12:00' | '13:00' | '14:00' | '15:00' | '16:00';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  donationType: 'whole_blood' | 'plasma' | 'platelets' | 'double_red_cells';
  location: string;
  notes?: string;
  confirmedBy?: mongoose.Types.ObjectId;
  confirmedAt?: Date;
  reminderSent: boolean;
  reminderSentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  estimatedDuration: number;
  isUpcoming(): boolean;
  confirm(userId: mongoose.Types.ObjectId): Promise<IAppointment>;
}

const appointmentSchema = new Schema<IAppointment>({
  donor: {
    type: Schema.Types.ObjectId,
    ref: 'Donor',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  timeSlot: {
    type: String,
    required: [true, 'Time slot is required'],
    enum: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'no_show'],
    default: 'scheduled'
  },
  donationType: {
    type: String,
    enum: ['whole_blood', 'plasma', 'platelets', 'double_red_cells'],
    default: 'whole_blood'
  },
  location: {
    type: String,
    required: [true, 'Donation location is required']
  },
  notes: {
    type: String,
    maxlength: 500
  },
  confirmedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  confirmedAt: Date,
  reminderSent: {
    type: Boolean,
    default: false
  },
  reminderSentAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
appointmentSchema.index({ donor: 1, appointmentDate: 1 });
appointmentSchema.index({ appointmentDate: 1, status: 1 });

// Virtual for appointment duration
appointmentSchema.virtual('estimatedDuration').get(function() {
  const durations: Record<string, number> = {
    'whole_blood': 45,
    'plasma': 90,
    'platelets': 120,
    'double_red_cells': 90
  };
  return durations[this.donationType] || 45;
});

// Method to check if appointment is upcoming
appointmentSchema.methods.isUpcoming = function(): boolean {
  return this.appointmentDate > new Date() && this.status === 'scheduled';
};

// Method to mark as confirmed
appointmentSchema.methods.confirm = function(userId: mongoose.Types.ObjectId): Promise<IAppointment> {
  this.status = 'confirmed';
  this.confirmedBy = userId;
  this.confirmedAt = new Date();
  return this.save();
};

const Appointment: Model<IAppointment> = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', appointmentSchema);

export default Appointment;
