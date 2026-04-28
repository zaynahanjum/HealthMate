import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
// import Sleep from '@/models/Sleep'; // Uncomment when your model is ready

export async function GET(req) {
  try {
    await dbConnect();
    // Fetch records here eventually
    return NextResponse.json({ records: [] }, { status: 200 });
  } catch (error) {
    // If it fails, explicitly return a JSON error so the frontend doesn't choke
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json(); // Make sure to parse the incoming JSON
    
    // Save to DB here eventually
    
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}