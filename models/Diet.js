import mongoose from 'mongoose';

const DietSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meal: { type: String, required: true }, // breakfast, lunch, dinner, snack
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  description: { type: String },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

if (mongoose.models.Diet) {
  delete mongoose.models.Diet;
}

export default mongoose.model('Diet', DietSchema);
