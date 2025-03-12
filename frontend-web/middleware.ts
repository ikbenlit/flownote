import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Lijst van publieke routes die geen authenticatie vereisen
  const publicPaths = [
    '/', 
    '/auth/login', 
    '/auth/register', 
    '/auth/reset-password',
    // Voeg hier andere publieke routes toe indien nodig
  ]
  
  // Check of het een publieke route is
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname === path)
  
  // Check of het een app route is
  const isAppRoute = request.nextUrl.pathname.startsWith('/app/')
  
  // Check of het een statische asset is
  const isStaticAsset = request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|css|js)$/)

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

  // Voor niet-publieke routes, laat de client-side auth check dit afhandelen
  // De Firebase Auth context in de app zorgt voor redirects indien nodig
  return NextResponse.next()
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