import { NextRequest, NextResponse } from "next/server";

const ADMIN_AUTH_COOKIE = "zippycash_admin_auth";

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

  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const authCookie = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;

    if (!authCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/success"],
};

// export const config = {
//   matcher: ["/success", "/apply"],
// };
