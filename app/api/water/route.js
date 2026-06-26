import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Water from '@/models/Water';
import User from '@/models/User';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(req) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
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
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { amount, name } = await req.json();

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
