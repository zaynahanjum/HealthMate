import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Medicine from '@/models/Medicine';

export async function PATCH(req, props) {
  try {
    await dbConnect();
    const params = await props.params;
    const { id } = params;
    const { status } = await req.json();

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedMedicine) {
      return NextResponse.json({ error: "Medicine not found" }, { status: 404 });
    }

    return NextResponse.json(updatedMedicine, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update medicine" }, { status: 500 });
  }
}

export async function DELETE(req, props) {
  try {
    await dbConnect();
    const params = await props.params;
    const { id } = params;
    await Medicine.findByIdAndDelete(id);
    return NextResponse.json({ message: "Medicine deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete medicine" }, { status: 500 });
  }
}
