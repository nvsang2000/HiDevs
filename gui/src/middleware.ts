import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('acc')?.value

    if(token) return NextResponse.next()
    else return NextResponse.redirect(new URL('/', request.url))
}
 
export const config = {
  matcher: '/dashboard/:path*',
}