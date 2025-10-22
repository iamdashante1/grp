import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IRole extends Document {
  name: 'admin' | 'donor' | 'nurse' | 'lab_tech' | 'receptionist' | 'hospital';
  permissions: ('read' | 'write' | 'delete' | 'admin')[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: [true, 'Role name is required'],
    enum: ['admin', 'donor', 'nurse', 'lab_tech', 'receptionist', 'hospital'],
    unique: true
  },
  permissions: [{
    type: String,
    enum: ['read', 'write', 'delete', 'admin']
  }],
  description: {
    type: String,
    maxlength: 200
  }
}, {
  timestamps: true
});

const Role: Model<IRole> = mongoose.models.Role || mongoose.model<IRole>('Role', roleSchema);

export default Role;
