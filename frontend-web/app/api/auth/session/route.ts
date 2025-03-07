import { auth } from '@/lib/firebase-admin'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.idToken) {
      console.error('No idToken provided')
      return NextResponse.json({ error: 'No idToken provided' }, { status: 400 })
    }
    
    // Maak een sessie cookie aan die 5 dagen geldig is
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 dagen
    
    try {
      const sessionCookie = await auth.createSessionCookie(body.idToken, { expiresIn })
      
      // Stel de cookie in
      cookies().set('session', sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })

      return NextResponse.json({ status: 'success' }, { status: 200 })
    } catch (error: any) {
      console.error('Error creating session cookie:', error)
      if (error.code === 'auth/invalid-id-token') {
        return NextResponse.json({ error: 'Invalid ID token' }, { status: 401 })
      }
      return NextResponse.json({ error: 'Session creation failed' }, { status: 500 })
    }
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE() {
  try {
    // Verwijder de sessie cookie
    cookies().delete('session')
    return NextResponse.json({ status: 'success' }, { status: 200 })
  } catch (error) {
    console.error('Session deletion error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 