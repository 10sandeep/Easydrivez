import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const authHeader = request.headers.get("authorization"); // ✅ lowercase header (Next.js normalizes this)
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { status: false, message: "Authorization header missing or invalid" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET || "default_secret";

        try {
            const decoded = jwt.verify(token, secret);
            return NextResponse.json(
                { status: true, message: "Token is valid ✅", user: decoded },
                { status: 200 }
            );
        } catch (error) {
            return NextResponse.json(
                { status: false, message: "Invalid or expired token" },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error("Token verification error:", error);
        return NextResponse.json(
            { status: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
