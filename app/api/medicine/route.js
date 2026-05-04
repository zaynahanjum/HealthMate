import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Medicine from '@/models/Medicine';

import User from '@/models/User';

export async function GET(req) {
  try {
    await dbConnect();
    // For now, get the first user
    const user = await User.findOne({ email: 'alex@example.com' }) || await User.create({ name: 'Alex', email: 'alex@example.com' });
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    // Migration: Update existing records that don't have a frequency field
    await Medicine.updateMany(
      { frequency: { $exists: false } },
      { $set: { frequency: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] } }
    );

    const medicines = await Medicine.find({ 
      userId: user._id,
      frequency: today 
    }).sort({ time: 1 });
    return NextResponse.json(medicines, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch medicines" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const user = await User.findOne({ email: 'alex@example.com' }) || await User.create({ name: 'Alex', email: 'alex@example.com' });

    const newMedicine = await Medicine.create({
      ...body,
      userId: user._id,
      status: 'pending'
    });

    return NextResponse.json(newMedicine, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add medicine" }, { status: 500 });
  }
}
