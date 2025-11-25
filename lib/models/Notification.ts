import mongoose, { Document, Schema, Model } from 'mongoose';

interface INotificationData {
  appointmentId?: mongoose.Types.ObjectId;
  donationId?: mongoose.Types.ObjectId;
  requestId?: mongoose.Types.ObjectId;
  bloodType?: string;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}

interface IDeliveryStatus {
  sent: boolean;
  sentAt?: Date;
  delivered: boolean;
  deliveredAt?: Date;
  failed: boolean;
  failureReason?: string;
  retryCount: number;
}

export interface INotification extends Document {
  recipient: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'appointment_reminder' | 'appointment_confirmation' | 'donation_thank_you' | 'eligibility_update' | 'stock_alert' | 'request_update' | 'system_maintenance' | 'general';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  channel: 'in_app' | 'email' | 'sms' | 'push';
  isRead: boolean;
  readAt?: Date;
  data?: INotificationData;
  deliveryStatus: IDeliveryStatus;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  timeAgo: string;
  markAsRead(): Promise<INotification>;
  isExpired(): boolean;
}

interface AppointmentDetails {
  _id: mongoose.Types.ObjectId;
  appointmentDate: string | Date;
  timeSlot: string;
}

interface INotificationModel extends Model<INotification> {
  createAppointmentReminder(userId: mongoose.Types.ObjectId, appointment: AppointmentDetails): Promise<INotification>;
  createStockAlert(userIds: mongoose.Types.ObjectId[], bloodType: string, stockLevel: string): Promise<INotification[]>;
  getUnreadCount(userId: mongoose.Types.ObjectId): Promise<number>;
}

const notificationSchema = new Schema<INotification>({
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Notification title is required'],
    maxlength: 100
  },
  message: {
    type: String,
    required: [true, 'Notification message is required'],
    maxlength: 500
  },
  type: {
    type: String,
    enum: [
      'appointment_reminder',
      'appointment_confirmation',
      'donation_thank_you',
      'eligibility_update',
      'stock_alert',
      'request_update',
      'system_maintenance',
      'general'
    ],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  channel: {
    type: String,
    enum: ['in_app', 'email', 'sms', 'push'],
    default: 'in_app'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  data: {
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment'
    },
    donationId: {
      type: Schema.Types.ObjectId,
      ref: 'Donation'
    },
    requestId: {
      type: Schema.Types.ObjectId,
      ref: 'Request'
    },
    bloodType: String,
    actionUrl: String,
    metadata: Schema.Types.Mixed
  },
  deliveryStatus: {
    sent: {
      type: Boolean,
      default: false
    },
    sentAt: Date,
    delivered: {
      type: Boolean,
      default: false
    },
    deliveredAt: Date,
    failed: {
      type: Boolean,
      default: false
    },
    failureReason: String,
    retryCount: {
      type: Number,
      default: 0
    }
  },
  expiresAt: {
    type: Date,
    index: { expireAfterSeconds: 0 }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ type: 1, createdAt: -1 });
notificationSchema.index({ priority: 1, isRead: 1 });

// Virtual for time since creation
notificationSchema.virtual('timeAgo').get(function(): string {
  const now = new Date();
  const diffMs = now.getTime() - this.createdAt.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return this.createdAt.toLocaleDateString();
});

// Method to mark as read
notificationSchema.methods.markAsRead = async function() {
  if (!this.isRead) {
    this.isRead = true;
    this.readAt = new Date();
    await this.save();
  }
  return this as unknown as INotification;
};

// Method to check if notification is expired
notificationSchema.methods.isExpired = function(): boolean {
  return !!(this.expiresAt && new Date() > this.expiresAt);
};

// Static method to create appointment reminder
notificationSchema.statics.createAppointmentReminder = function(userId: mongoose.Types.ObjectId, appointment: AppointmentDetails): Promise<INotification> {
  const appointmentDate = new Date(appointment.appointmentDate);
  const formattedDate = appointmentDate.toLocaleDateString();
  const formattedTime = appointment.timeSlot;

  return this.create({
    recipient: userId,
    title: 'Appointment Reminder',
    message: `Don't forget your blood donation appointment on ${formattedDate} at ${formattedTime}`,
    type: 'appointment_reminder',
    priority: 'high',
    channel: 'email',
    data: {
      appointmentId: appointment._id,
      actionUrl: `/appointments/${appointment._id}`
    },
    expiresAt: appointmentDate
  });
};

// Static method to create stock alert
notificationSchema.statics.createStockAlert = function(userIds: mongoose.Types.ObjectId[], bloodType: string, stockLevel: string): Promise<INotification[]> {
  const notifications = userIds.map((userId) => ({
    recipient: userId,
    title: 'Low Blood Stock Alert',
    message: `${bloodType} blood stock is ${stockLevel}. Immediate attention required.`,
    type: 'stock_alert' as const,
    priority: (stockLevel === 'critical' ? 'urgent' : 'high') as 'urgent' | 'high',
    channel: 'in_app' as const,
    data: {
      bloodType,
      actionUrl: '/inventory'
    }
  }));

  return this.insertMany(notifications);
};

// Static method to get unread count
notificationSchema.statics.getUnreadCount = function(userId: mongoose.Types.ObjectId): Promise<number> {
  return this.countDocuments({ recipient: userId, isRead: false });
};

// Pre-save middleware to set default expiration
notificationSchema.pre('save', function(next) {
  if (this.isNew && !this.expiresAt) {
    const defaultExpiryDays: Record<string, number> = {
      'appointment_reminder': 1,
      'appointment_confirmation': 7,
      'donation_thank_you': 30,
      'eligibility_update': 60,
      'stock_alert': 1,
      'request_update': 7,
      'system_maintenance': 1,
      'general': 30
    };

    const days = defaultExpiryDays[this.type] || 30;
    this.expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
  next();
});

const Notification = (mongoose.models.Notification || mongoose.model<INotification, INotificationModel>('Notification', notificationSchema)) as INotificationModel;

export default Notification;
