import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies"; 

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request); 

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/user/sign-in", request.url));
  }

  return NextResponse.next();
}

// protect specific routes
export const config = {
  matcher: ["/post/create/:path*", 
            "/((?!api/auth|user/sign-in|user/sign-up|user/[^/]+$|_next/static|_next/image|favicon.ico).*)",
  ], 
};