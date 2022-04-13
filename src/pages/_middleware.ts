import { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest & NextApiRequest) {
  // Allow request if token exist or request for next-auth session & provider
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname } = req.nextUrl

  // allow the request to pass
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // redirect them to login if they dont have token and requesting a protected route
  if (!token && pathname !== '/login') {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    console.log(url)
    return NextResponse.redirect(url)
  }
}
