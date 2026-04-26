import mongoose from 'mongoose';

const SleepSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hours: { type: Number, required: true },
  quality: { type: String },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Sleep || mongoose.model('Sleep', SleepSchema);
