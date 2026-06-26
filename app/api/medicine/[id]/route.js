import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Medicine from '@/models/Medicine';
import { getAuthenticatedUser } from '@/lib/auth';

export async function PATCH(req, props) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const params = await props.params;
    const { id } = params;
    const { status } = await req.json();

    const updatedMedicine = await Medicine.findOneAndUpdate(
      { _id: id, userId: user._id },
      { status },
      { new: true }
    );

    if (!updatedMedicine) {
      return NextResponse.json({ error: "Medicine not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(updatedMedicine, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update medicine" }, { status: 500 });
  }
}

export async function DELETE(req, props) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const params = await props.params;
    const { id } = params;
    
    const deletedMedicine = await Medicine.findOneAndDelete({ _id: id, userId: user._id });
    if (!deletedMedicine) {
      return NextResponse.json({ error: "Medicine not found or unauthorized" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Medicine deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete medicine" }, { status: 500 });
  }
}
