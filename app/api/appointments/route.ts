import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import Appointment from '@/models/Appointment'

export async function GET() {
  try {
    await dbConnect()
    const appointments = await Appointment.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: appointments })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    
    const appointment = new Appointment({
      name: body.name,
      email: body.email,
      phone: body.phone,
      date: body.date,
      time: body.time,
      purpose: body.purpose,
      status: body.status || 'pending'
    })
    
    const savedAppointment = await appointment.save()
    return NextResponse.json({ success: true, data: savedAppointment })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create appointment' }, { status: 500 })
  }
}