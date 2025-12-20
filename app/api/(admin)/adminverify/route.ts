import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/**
 * 🔴 REQUIRED for Vercel + headers + cookies + JWT
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(request: NextRequest): Promise<NextResponse> {
    console.log("🔍 [API /adminverify] GET request received");

    try {
        // ---------- TOKEN SOURCES ----------
        const cookieToken = request.cookies.get("token")?.value;
        const authHeader = request.headers.get("authorization");

        console.log("🍪 Cookie token:", cookieToken ? "EXISTS" : "MISSING");
        console.log("🎫 Auth header:", authHeader ? "EXISTS" : "MISSING");

        let token: string | undefined = cookieToken;

        if (!token && authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        if (!token) {
            console.warn("❌ No token provided");
            return NextResponse.json(
                { status: false, message: "Authorization token missing" },
                { status: 401 }
            );
        }

        // ---------- JWT SECRET ----------
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error("❌ JWT_SECRET not configured");
            return NextResponse.json(
                { status: false, message: "Server configuration error" },
                { status: 500 }
            );
        }

        // ---------- VERIFY TOKEN ----------
        let decoded;
        try {
            decoded = jwt.verify(token, secret);
        } catch (err) {
            console.warn("❌ Invalid or expired token");
            return NextResponse.json(
                { status: false, message: "Invalid or expired token" },
                { status: 401 }
            );
        }

        console.log("✅ Token verified successfully");

        return NextResponse.json(
            {
                status: true,
                message: "Token is valid",
                admin: decoded,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("❌ Unexpected error:", error);
        return NextResponse.json(
            { status: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}