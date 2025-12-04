import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    
    // Simple hardcoded admin for testing
    if (username === 'admin' && password === 'admin123') {
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')
      return NextResponse.json({ 
        success: true, 
        token,
        user: { username: 'admin', role: 'admin' }
      })
    }
    
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 })
  }
}