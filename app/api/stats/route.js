import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Water from '@/models/Water';
import Medicine from '@/models/Medicine';
import Sleep from '@/models/Sleep';
import Diet from '@/models/Diet';

export async function GET(req) {
  try {
    await dbConnect();
    const user = await User.findOne({ email: 'alex@example.com' }) || await User.create({ name: 'Alex', email: 'alex@example.com' });
    console.log("Stats API hit for user:", user.email);

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    // 1. Water Stats
    let waterIntake = 0;
    try {
      const waterLogs = await Water.find({
        userId: user._id,
        date: { $gte: startOfDay, $lte: endOfDay }
      });
      waterIntake = waterLogs.reduce((sum, log) => sum + (log.amount || 0), 0);
    } catch (e) { console.error("Water stats error:", e); }

    // 2. Medicine Stats
    let nextMed = null;
    let todayMedsCount = 0;
    try {
      const medicines = await Medicine.find({ userId: user._id });
      const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const todayMeds = medicines.filter(m => Array.isArray(m.frequency) && m.frequency.includes(todayName));
      todayMedsCount = todayMeds.length;
      
      const currentTime = now.getHours() * 60 + now.getMinutes();
      let minDiff = Infinity;
      
      todayMeds.forEach(med => {
        if (med.time && med.time.includes(' ') && med.status !== 'taken') {
          const [timePart, modifier] = med.time.split(' ');
          let [h, m] = timePart.split(':').map(Number);
          
          if (modifier === 'PM' && h < 12) h += 12;
          if (modifier === 'AM' && h === 12) h = 0;
          
          const medTime = h * 60 + m;
          const diff = medTime - currentTime;
          if (diff > 0 && diff < minDiff) {
            minDiff = diff;
            nextMed = med.time;
          }
        }
      });
    } catch (e) { console.error("Medicine stats error:", e); }

    // 3. Sleep Stats
    let sleepHours = 0;
    try {
      const sleepRecord = await Sleep.findOne({
        userId: user._id,
        date: { $gte: startOfDay, $lte: endOfDay }
      });
      sleepHours = sleepRecord ? (sleepRecord.hours || 0) : 0;
    } catch (e) { console.error("Sleep stats error:", e); }

    // 4. Diet Stats
    let calories = 0;
    let protein = 0;
    try {
      const dietLogs = await Diet.find({
        userId: user._id,
        date: { $gte: startOfDay, $lte: endOfDay }
      });
      calories = dietLogs.reduce((sum, log) => sum + (log.calories || 0), 0);
      protein = dietLogs.reduce((sum, log) => sum + (log.protein || 0), 0);
    } catch (e) { console.error("Diet stats error:", e); }

    return NextResponse.json({
      water: { current: waterIntake, goal: 2500 },
      medicine: { next: nextMed, count: todayMedsCount },
      sleep: { current: sleepHours, goal: 8 },
      diet: { calories, protein, goal: 2000 }
    });
  } catch (error) {
    console.error("Global stats API error:", error);
    return NextResponse.json({ error: "Failed to fetch stats", details: error.message }, { status: 500 });
  }
}
