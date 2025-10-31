import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest): Promise<NextResponse> {
    console.log("🔍 [API /adminverify] GET request received");
    
    try {
        // ✅ Check multiple token sources
        const cookieToken = request.cookies.get("token")?.value;
        const authHeader = request.headers.get("authorization");
        
        console.log("🍪 [API /adminverify] Cookie token:", cookieToken ? "EXISTS" : "MISSING");
        console.log("🎫 [API /adminverify] Auth header:", authHeader ? "EXISTS" : "MISSING");

        // ✅ Extract token from Authorization header (sent from localStorage)
        let token = cookieToken;
        
        if (!token && authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
            console.log("🎫 [API /adminverify] Token from Authorization header");
        }

        if (!token) {
            console.log("❌ [API /adminverify] No token found in cookie or header");
            return NextResponse.json(
                { status: false, message: "Authorization token missing" },
                { status: 200 }
            );
        }

        console.log("🎫 [API /adminverify] Token preview:", token.substring(0, 30) + "...");

        const secret = process.env.JWT_SECRET || "default_secret";

        try {
            const decoded = jwt.verify(token, secret);
            console.log("✅ [API /adminverify] Token verified successfully:", decoded);
            return NextResponse.json(
                { status: true, message: "Token is valid ✅", admin: decoded },
                { status: 200 }
            );
        } catch (error) {
            console.error("❌ [API /adminverify] JWT verify error:", error);
            return NextResponse.json(
                { status: false, message: "Invalid or expired token" },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("❌ [API /adminverify] Token verification error:", error);
        return NextResponse.json(
            { status: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}