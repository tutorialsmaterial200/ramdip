import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Achievement from "@/models/Achievement";

export async function GET() {
  try {
    await dbConnect();
    const achievements = await Achievement.find({ isActive: true }).sort({ order: 1, year: -1 });
    return NextResponse.json(achievements);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    const achievement = await Achievement.create(data);
    return NextResponse.json(achievement, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create achievement" }, { status: 500 });
  }
}
