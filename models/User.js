import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firebaseUid: { type: String, required: true, unique: true },
  age: { type: Number, default: null },
  gender: { type: String, enum: ['Male', 'Female', null], default: null },
  height: { type: Number, default: null },
  weight: { type: Number, default: null },
  goal: { type: String, default: "Maintain Weight" },
  activityLevel: {
    type: String,
    enum: ['Sedentary', 'Lightly Active', 'Moderate', 'Very Active'],
    default: 'Sedentary',
  },
  waterGoal: { type: Number, default: null },
  proteinGoal: { type: Number, default: null },
  calorieGoal: { type: Number, default: null },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
