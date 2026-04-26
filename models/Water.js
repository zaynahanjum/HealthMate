import mongoose from 'mongoose';

const WaterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true }, // in ml
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Water || mongoose.model('Water', WaterSchema);
