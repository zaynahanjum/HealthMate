import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Sleep from '@/models/Sleep';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(req) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sleepRecords = await Sleep.find({ userId: user._id }).sort({ date: -1 }).limit(10);
    
    // Calculate Weekly Average
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    const weeklyRecords = await Sleep.find({
      userId: user._id,
      date: { $gte: last7Days }
    });
    
    const totalHours = weeklyRecords.reduce((sum, rec) => sum + rec.hours, 0);
    const averageHours = weeklyRecords.length > 0 ? (totalHours / weeklyRecords.length).toFixed(1) : 0;

    // Weekly Trend for the chart
    const trend = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const record = weeklyRecords.find(r => new Date(r.date).toDateString() === date.toDateString());
      trend.push({
        day: dayName,
        hours: record ? record.hours : 0,
        height: record ? `${Math.min((record.hours / 8) * 100, 100)}%` : '0%'
      });
    }

    return NextResponse.json({ 
      records: sleepRecords, 
      averageHours,
      trend
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sleep data" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const updatedRecord = await Sleep.findOneAndUpdate(
      { 
        userId: user._id,
        date: { $gte: startOfDay, $lte: endOfDay }
      },
      { 
        ...body,
        userId: user._id,
        date: new Date()
      },
      { upsert: true, new: true }
    );
    
    return NextResponse.json(updatedRecord, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save sleep record" }, { status: 500 });
  }
}