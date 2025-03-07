import { cookies } from 'next/headers'
import { auth } from '@/lib/firebase-admin'
import { NextResponse } from 'next/server'

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}

export async function GET() {
  try {
    // Haal de session cookie op
    const cookieStore = cookies()
    const session = cookieStore.get('session')

    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: 'Geen session cookie gevonden' }),
        { status: 401 }
      )
    }

    // Verifieer de session met Firebase Admin
    const decodedClaims = await auth.verifySessionCookie(session.value)
    
    // Log voor debugging
    console.log('Session verified:', {
      uid: decodedClaims.uid,
      email: decodedClaims.email
    })

    return new NextResponse(JSON.stringify({ 
      uid: decodedClaims.uid,
      email: decodedClaims.email
    }))

  } catch (error) {
    console.error('Session verification error:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Ongeldige session' }),
      { status: 401 }
    )
  }
} 