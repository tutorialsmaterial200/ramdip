import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import About from "@/models/About";

export async function GET() {
  try {
    await dbConnect();
    const about = await About.findOne({ isActive: true });
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch about" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    
    let about = await About.findOne({ isActive: true });
    
    if (about) {
      about = await About.findByIdAndUpdate(about._id, data, { new: true });
    } else {
      about = await About.create(data);
    }
    
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update about" }, { status: 500 });
  }
}
