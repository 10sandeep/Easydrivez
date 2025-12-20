import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * IMPORTANT:
 * This API uses headers & cookies → must be dynamic
 */
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<NextResponse> {
  console.log("🔍 [API /adminverify] Request received");

  try {
    // ---------- TOKEN EXTRACTION ----------
    const cookieToken = request.cookies.get("token")?.value;
    const authHeader = request.headers.get("authorization");

    let token: string | undefined = cookieToken;

    if (!token && authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      console.warn("❌ [API /adminverify] No token provided");
      return NextResponse.json(
        { status: false, message: "Authorization token missing" },
        { status: 401 }
      );
    }

    // ---------- JWT VERIFICATION ----------
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("❌ JWT_SECRET is not defined");
      return NextResponse.json(
        { status: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    let decoded: string | JwtPayload;

    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      console.warn("❌ [API /adminverify] Invalid or expired token");
      return NextResponse.json(
        { status: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // ---------- SUCCESS ----------
    console.log("✅ [API /adminverify] Token verified");

    return NextResponse.json(
      {
        status: true,
        message: "Token is valid",
        admin: decoded,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ [API /adminverify] Unexpected error:", error);
    return NextResponse.json(
      { status: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}