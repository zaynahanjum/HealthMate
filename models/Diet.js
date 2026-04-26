import mongoose from 'mongoose';

const DietSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meal: { type: String, required: true }, // breakfast, lunch, dinner, snack
  calories: { type: Number },
  description: { type: String },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Diet || mongoose.model('Diet', DietSchema);
