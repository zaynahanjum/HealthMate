import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Water from '@/models/Water';
import User from '@/models/User';

export async function GET(req) {
  try {
    await dbConnect();
    const user = await User.findOneAndUpdate(
      {},
      { $setOnInsert: { name: 'Alex', email: 'alex@example.com' } },
      { upsert: true, new: true }
    );

    // 1. Calculate Since Last Drink
    const lastLog = await Water.findOne({ userId: user._id }).sort({ date: -1 });
    let sinceLastDrink = "No logs yet";
    if (lastLog) {
      const diffMs = new Date() - new Date(lastLog.date);
      const diffMins = Math.floor(diffMs / (1000 * 60));
      if (diffMins < 60) {
        sinceLastDrink = `${diffMins} min${diffMins !== 1 ? 's' : ''}`;
      } else {
        const diffHours = Math.floor(diffMins / 60);
        sinceLastDrink = `${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
      }
    }

    // 2. Calculate Weekly Trend
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      last7Days.push(date);
    }

    const weeklyTrend = await Promise.all(last7Days.map(async (dayStart) => {
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);
      
      const dayLogs = await Water.find({
        userId: user._id,
        date: { $gte: dayStart, $lte: dayEnd }
      });
      
      const total = dayLogs.reduce((sum, log) => sum + log.amount, 0);
      const dayName = dayStart.toLocaleDateString('en-US', { weekday: 'short' });
      const isToday = new Date().toLocaleDateString() === dayStart.toLocaleDateString();
      
      return { day: dayName, amount: total, height: `${Math.min((total / 2500) * 100, 100)}%`, active: isToday };
    }));

    // 3. Calculate Streak
    let streak = 0;
    let checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);

    // Check if logged today or yesterday to start streak calculation
    const loggedToday = await Water.exists({
      userId: user._id,
      date: { $gte: checkDate, $lte: new Date(checkDate).setHours(23, 59, 59, 999) }
    });

    if (!loggedToday) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
      const dayStart = new Date(checkDate);
      const dayEnd = new Date(checkDate);
      dayEnd.setHours(23, 59, 59, 999);

      const hasLogs = await Water.exists({
        userId: user._id,
        date: { $gte: dayStart, $lte: dayEnd }
      });

      if (hasLogs) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return NextResponse.json({
      sinceLastDrink,
      weeklyTrend,
      streak
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch water stats" }, { status: 500 });
  }
}
