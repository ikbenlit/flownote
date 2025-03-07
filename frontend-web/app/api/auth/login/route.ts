import { auth } from '@/lib/firebase-admin'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()

    if (!idToken) {
      return new NextResponse(
        JSON.stringify({ error: 'Geen ID token ontvangen' }),
        { status: 400 }
      )
    }

    // Maak een session cookie aan (geldig voor 5 dagen)
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 dagen
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })

    // Stel de cookie in
    cookies().set('session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    })

    return new NextResponse(JSON.stringify({ success: true }))

  } catch (error) {
    console.error('Login error:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Inloggen mislukt' }),
      { status: 401 }
    )
  }
} 