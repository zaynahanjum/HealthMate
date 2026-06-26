import { NextResponse } from 'next/server';
import User from '@/models/User';
import { getAuthenticatedUser } from '@/lib/auth';
import { calculateGoals } from '@/lib/goals';

function parseNumber(value) {
  if (value === '' || value == null) return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

export async function GET(req) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await req.json();

    const update = {
      name: body.name?.trim(),
      age: parseNumber(body.age),
      gender: body.gender || null,
      height: parseNumber(body.height),
      weight: parseNumber(body.weight),
      goal: body.goal,
      activityLevel: body.activityLevel || 'Sedentary',
    };

    const goals = calculateGoals(update);
    Object.assign(update, goals);

    const updatedUser = await User.findByIdAndUpdate(user._id, update, {
      new: true,
      runValidators: true,
    });
    
    return NextResponse.json({ message: "Profile updated!", profile: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile", details: error.message },
      { status: 500 }
    );
  }
}
