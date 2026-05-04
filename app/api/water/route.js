import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Water from '@/models/Water';

import User from '@/models/User';

export async function GET(req) {
  try {
    await dbConnect();
    const user = await User.findOne({ email: 'alex@example.com' }) || await User.create({ name: 'Alex', email: 'alex@example.com' });
    
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const logs = await Water.find({
      userId: user._id,
      date: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ date: -1 });

    const totalIntake = logs.reduce((sum, log) => sum + log.amount, 0);

    return NextResponse.json({ logs, totalIntake }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch water logs" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const { amount, name } = await req.json();
    
    const user = await User.findOne({ email: 'alex@example.com' }) || await User.create({ name: 'Alex', email: 'alex@example.com' });

    const newLog = await Water.create({
      userId: user._id,
      amount,
      date: new Date()
    });

    return NextResponse.json(newLog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add water intake" }, { status: 500 });
  }
}
