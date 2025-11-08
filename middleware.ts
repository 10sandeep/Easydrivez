import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const origin = req.headers.get("origin") || "";
    const allowed = ["https://www.eazydrivez.com"];

    const res = NextResponse.next();

    // Allow your domain only
    if (allowed.includes(origin)) {
        res.headers.set("Access-Control-Allow-Origin", origin);
    }

    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Preflight request
    if (req.method === "OPTIONS") {
        return new NextResponse(null, {
            status: 204,
            headers: res.headers,
        });
    }

    return res;
}

export const config = {
    matcher: "/api/:path*", // apply to all API routes
};
