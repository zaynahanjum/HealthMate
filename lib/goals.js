const ACTIVITY_MULTIPLIERS = {
  'Sedentary': 1.2,
  'Lightly Active': 1.375,
  'Moderate': 1.55,
  'Very Active': 1.725,
};

export function calculateGoals({ weight, height, age, gender, activityLevel = 'Sedentary' }) {
  if (!weight || !height || !age || !gender) {
    return {
      waterGoal: 2500,
      proteinGoal: 150,
      calorieGoal: 2000,
    };
  }

  const waterGoal = Math.round(weight * 35);
  const proteinGoal = Math.round(weight * 0.8 * 10) / 10;

  let bmr;
  if (gender === 'Male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] ?? 1.2;
  const calorieGoal = Math.round(bmr * multiplier);

  return { waterGoal, proteinGoal, calorieGoal };
}
