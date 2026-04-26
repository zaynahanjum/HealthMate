import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Water from '@/models/Water';

export async function GET(req) {
  await dbConnect();
  return NextResponse.json({ message: "Water tracker endpoint ready" }, { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  return NextResponse.json({ message: "Add water intake ready" }, { status: 201 });
}
