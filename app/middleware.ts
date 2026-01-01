import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
 console.log(req.headers.get("host"))
  const host = req.headers.get("host") ?? "";
  const hostname = host.split(":")[0];
  const pathname = req.nextUrl.pathname;

  console.log(hostname)
  console.log(pathname)

  // ---------- LOCAL DEV ----------
  if (hostname.endsWith(".localhost")) {
    const subdomain = hostname.replace(".localhost", "");
     console.log(subdomain)
    if (subdomain === "blog") {
      return NextResponse.rewrite(
        new URL(pathname === "/" ? "/blog" : `/blog${pathname}`, req.url)
      );
    }

    if (subdomain === "cars") {
      return NextResponse.rewrite(
        new URL(pathname === "/" ? "/allcars" : `/allcars${pathname}`, req.url)
      );
    }

    if (subdomain === "bike") {
      return NextResponse.rewrite(
        new URL(pathname === "/" ? "/allbikes" : `/allbikes${pathname}`, req.url)
      );
    }
  }

  // ---------- PRODUCTION ----------
  const ROOT_DOMAIN = "yourdomain.com";

  if (hostname.endsWith(ROOT_DOMAIN)) {
    const subdomain = hostname.replace(`.${ROOT_DOMAIN}`, "");

    if (subdomain === "blog") {
      return NextResponse.rewrite(
        new URL(pathname === "/" ? "/blog" : `/blog${pathname}`, req.url)
      );
    }

    if (subdomain === "cars") {
      return NextResponse.rewrite(
        new URL(pathname === "/" ? "/allcars" : `/allcars${pathname}`, req.url)
      );
    }

    if (subdomain === "bike") {
      return NextResponse.rewrite(
        new URL(pathname === "/" ? "/allbikes" : `/allbikes${pathname}`, req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
