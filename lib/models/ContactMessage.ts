import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IContactMessage extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'normal' | 'high';
  referenceId: string;
  source: 'web' | 'phone' | 'email';
  userId?: mongoose.Types.ObjectId;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const contactMessageSchema = new Schema<IContactMessage>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'resolved', 'closed'],
    default: 'new',
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high'],
    default: 'normal',
  },
  referenceId: {
    type: String,
    unique: true,
    index: true,
  },
  source: {
    type: String,
    enum: ['web', 'phone', 'email'],
    default: 'web',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  metadata: {
    type: Schema.Types.Mixed,
  },
}, {
  timestamps: true,
});

contactMessageSchema.pre('save', function(next) {
  if (!this.referenceId) {
    const dateSegment = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSegment = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.referenceId = `MSG-${dateSegment}-${randomSegment}`;
  }
  next();
});

contactMessageSchema.index({ status: 1, priority: -1, createdAt: -1 });

const ContactMessage: Model<IContactMessage> = mongoose.models.ContactMessage
  || mongoose.model<IContactMessage>('ContactMessage', contactMessageSchema);

export default ContactMessage;
