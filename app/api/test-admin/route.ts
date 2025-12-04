import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db()
    
    const admins = await db.collection('admins').find({}).toArray()
    
    return NextResponse.json({ 
      success: true, 
      count: admins.length,
      admins: admins.map(admin => ({ 
        username: admin.username, 
        hasPassword: !!admin.password,
        passwordLength: admin.password?.length 
      }))
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}