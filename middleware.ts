import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ✅ Protect frontend admin pages
    if (pathname.startsWith("/admin") && !pathname.startsWith("/adminlogin")) {
        const token = request.cookies.get("token")?.value || null;

        if (!token) {
            // Redirect to admin login if token missing
            const loginUrl = new URL("/adminlogin", request.url);
            return NextResponse.redirect(loginUrl);
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET || "default_secret");
            return NextResponse.next(); // ✅ Token valid
        } catch (error) {
            const loginUrl = new URL("/adminlogin", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // ✅ Protect backend admin APIs
    if (pathname.startsWith("/api/(admin)/")) {
        if (
            pathname.startsWith("/api/(admin)/adminlogin") ||
            pathname.startsWith("/api/(admin)/createadmin")
        ) {
            return NextResponse.next();
        }

        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { status: false, message: "Unauthorized - missing token" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET || "default_secret";

        try {
            jwt.verify(token, secret);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.json(
                { status: false, message: "Unauthorized - invalid or expired token" },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/(admin)/:path*"], // ✅ both pages + APIs
};
