import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import Appointment from '@/models/Appointment'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const body = await request.json()
    
    const appointment = await Appointment.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    )
    
    return NextResponse.json({ success: true, data: appointment })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update appointment' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    
    await Appointment.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete appointment' }, { status: 500 })
  }
}