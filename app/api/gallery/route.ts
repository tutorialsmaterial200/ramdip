import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import Gallery from '@/models/Gallery'

export async function GET() {
  try {
    await dbConnect()
    const items = await Gallery.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    
    const item = new Gallery({
      title: body.title,
      image: body.image,
      description: body.description,
      category: body.category
    })
    
    const savedItem = await item.save()
    return NextResponse.json({ success: true, data: savedItem })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create gallery item' }, { status: 500 })
  }
}