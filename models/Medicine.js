import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  instruction: { type: String },
  time: { type: String },
  status: { type: String, enum: ['taken', 'pending', 'missed'], default: 'pending' },
  frequency: { 
    type: [String], 
    default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] 
  },
}, { timestamps: true });

if (mongoose.models.Medicine) {
  delete mongoose.models.Medicine;
}

export default mongoose.model('Medicine', MedicineSchema);
