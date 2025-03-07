import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}

export async function POST() {
  try {
    // Verwijder de session cookie
    cookies().delete('session')
    
    return new NextResponse(JSON.stringify({ success: true }))
  } catch (error) {
    console.error('Logout error:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Uitloggen mislukt' }),
      { status: 500 }
    )
  }
} 