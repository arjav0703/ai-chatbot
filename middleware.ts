import { auth } from "@/auth";
import { NextResponse } from "next/server";
//import type { NextRequest } from "next/server";

// Export the middleware function
export default auth((req) => {
  const { pathname } = req.nextUrl;

  // If the user is not authenticated and trying to access a protected route
  if (!req.auth && pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
});

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/chat-9", "/chat-10"],
};
