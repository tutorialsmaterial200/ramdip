import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import BlogPost from '@/models/BlogPost'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await dbConnect()
    
    const post = await BlogPost.findOne({ slug: params.slug, published: true })
    
    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, post })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch blog post' }, { status: 500 })
  }
}