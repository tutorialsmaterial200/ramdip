import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hero from "@/models/Hero";

export async function GET() {
  try {
    await dbConnect();
    const hero = await Hero.findOne({ isActive: true });
    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hero" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    
    let hero = await Hero.findOne({ isActive: true });
    
    if (hero) {
      hero = await Hero.findByIdAndUpdate(hero._id, data, { new: true });
    } else {
      hero = await Hero.create(data);
    }
    
    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update hero" }, { status: 500 });
  }
}
