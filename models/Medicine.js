import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  dosage: { type: String },
  time: { type: String },
  status: { type: String, enum: ['taken', 'pending'], default: 'pending' },
}, { timestamps: true });

export default mongoose.models.Medicine || mongoose.model('Medicine', MedicineSchema);
