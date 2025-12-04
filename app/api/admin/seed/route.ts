import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Admin from "@/models/Admin";

// Seed initial admin - only works once
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const existingAdmin = await Admin.findOne();
    
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin already exists" },
        { status: 400 }
      );
    }

    const admin = await Admin.create({
      email: "admin@cpnmc.org.np",
      password: "admin123",
      name: "Super Admin",
      role: "superadmin",
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      message: "Admin created successfully",
      admin: {
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed admin" },
      { status: 500 }
    );
  }
}
