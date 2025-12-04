import { NextRequest, NextResponse } from 'next/server'
import imagekit from '@/lib/imagekit'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: '/jbsimkhada'
    })

    return NextResponse.json({ 
      success: true, 
      url: result.url,
      fileId: result.fileId 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}