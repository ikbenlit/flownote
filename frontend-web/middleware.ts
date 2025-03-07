import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Lijst van publieke routes die geen authenticatie vereisen
  const publicPaths = ['/', '/login', '/register', '/features']
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname === path)

  // API routes overslaan
  if (request.nextUrl.pathname.startsWith('/api')) {
    const origin = request.headers.get('origin') || ''
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.NEXT_PUBLIC_API_URL,
    ].filter(Boolean)

    // Check of de origin toegestaan is
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      // Return response met CORS headers
      const response = NextResponse.next()
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      response.headers.set('Access-Control-Allow-Credentials', 'true')
      
      return response
    }
  }

  try {
    // Haal de session cookie op
    const sessionCookie = request.cookies.get('session')?.value

    if (!sessionCookie && !isPublicPath) {
      // Geen sessie en geen publieke route: redirect naar login
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (sessionCookie && !isPublicPath) {
      try {
        // Verifieer de sessie via de API route
        const response = await fetch(new URL('/api/auth/verify', request.url), {
          headers: {
            Cookie: `session=${sessionCookie}`
          }
        })

        if (!response.ok) {
          // Ongeldige sessie: redirect naar login met redirect URL
          const loginUrl = new URL('/login', request.url)
          loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
          return NextResponse.redirect(loginUrl)
        }

        return NextResponse.next()
      } catch (error) {
        // API error: redirect naar login met redirect URL
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
      }
    }

    // Publieke routes zijn altijd toegankelijk
    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 