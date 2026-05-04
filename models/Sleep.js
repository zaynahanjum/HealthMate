import mongoose from 'mongoose';

const SleepSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  wentToBed: { type: String, required: true },
  wokeUpAt: { type: String, required: true },
  hours: { type: Number, required: true },
  efficiency: { type: Number, default: 100 },
  quality: { type: String, default: 'Good' },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Sleep || mongoose.model('Sleep', SleepSchema);
