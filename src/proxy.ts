import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block /reviews
  // if (pathname === "/apply") {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // Protect /success
  const submitted = request.cookies.get("applicationSubmitted");

  if (pathname === "/success" && !submitted) {
    return NextResponse.redirect(new URL("/apply", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/success"],
};

// export const config = {
//   matcher: ["/success", "/apply"],
// };
