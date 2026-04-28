import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, default: null },
  height: { type: Number, default: null }, // Stored in cm
  weight: { type: Number, default: null }, // Stored in kg
  goal: { type: String, default: "Maintain Weight" },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);