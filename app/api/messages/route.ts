import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import Message from '@/models/Message'

export async function GET() {
  try {
    await dbConnect()
    const messages = await Message.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: messages })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    
    const message = new Message({
      name: body.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject,
      message: body.message
    })
    
    const savedMessage = await message.save()
    return NextResponse.json({ success: true, data: savedMessage })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save message' }, { status: 500 })
  }
}