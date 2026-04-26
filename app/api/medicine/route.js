import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Medicine from '@/models/Medicine';

export async function GET(req) {
  await dbConnect();
  return NextResponse.json({ message: "Medicine endpoint ready" }, { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  return NextResponse.json({ message: "Add medicine ready" }, { status: 201 });
}
