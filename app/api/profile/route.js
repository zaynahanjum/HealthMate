import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req) {
  try {
    await dbConnect();
    const user = await User.findOne({ email: 'alex@example.com' }) || await User.create({ 
      name: 'Alex', 
      email: 'alex@example.com',
      age: 28,
      height: 175,
      weight: 72,
      goal: 'Gain Muscle'
    });
    
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const updatedUser = await User.findOneAndUpdate(
      { email: 'alex@example.com' },
      { ...body }, 
      { new: true, upsert: true }
    );
    
    return NextResponse.json({ message: "Profile updated!", profile: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}