import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import Message from '@/models/Message'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const body = await request.json()
    
    const message = await Message.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    )
    
    return NextResponse.json({ success: true, data: message })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update message' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    
    await Message.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete message' }, { status: 500 })
  }
}