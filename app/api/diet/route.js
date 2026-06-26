import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Diet from '@/models/Diet';
import User from '@/models/User';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(req) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const logs = await Diet.find({
      userId: user._id,
      date: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ createdAt: -1 });

    const totals = logs.reduce((acc, log) => {
      acc.calories += (log.calories || 0);
      acc.protein += (log.protein || 0);
      return acc;
    }, { calories: 0, protein: 0 });

    return NextResponse.json({ logs, totals }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch diet data" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();

    const newLog = await Diet.create({
      description: body.description,
      meal: body.meal,
      calories: body.calories || 0,
      protein: body.protein || 0,
      userId: user._id,
      date: new Date()
    });
    
    return NextResponse.json(newLog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add diet record" }, { status: 500 });
  }
}
