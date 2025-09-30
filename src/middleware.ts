import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export async function middleware(req: NextRequest) {



 const token = await getToken({req , secret:process.env.NEXTAUTH_SECRET})
 console.log(token)
 if(token){
    return NextResponse.next()
 } else{
      return NextResponse.redirect(new URL('/login', req.url))

 }
}
 

export const config = {
  matcher: ['/cart:path*', '/orders'],
}
