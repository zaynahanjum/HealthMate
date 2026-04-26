import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Diet from '@/models/Diet';

export async function GET(req) {
  await dbConnect();
  return NextResponse.json({ message: "Diet tracker endpoint ready" }, { status: 200 });
}

export async function POST(req) {
  await dbConnect();
  return NextResponse.json({ message: "Add diet record ready" }, { status: 201 });
}
