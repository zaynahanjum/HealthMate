import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User'; // <-- Using your existing User model!

// GET: Fetch the user's profile data
export async function GET(req) {
  try {
    await dbConnect();
    // Grabbing the first user for now. Later, you'll filter by logged-in user ID.
    let userProfile = await User.findOne(); 
    
    if (!userProfile) {
      return NextResponse.json({ message: "No user found" }, { status: 404 });
    }
    
    return NextResponse.json(userProfile, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// POST: Update the user's profile
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Update the first user it finds, or create one if it doesn't exist
    const updatedUser = await User.findOneAndUpdate(
      {}, // filter
      body, 
      { new: true, upsert: true }
    );
    
    return NextResponse.json({ message: "Profile updated!", profile: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}