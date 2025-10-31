import { NextResponse, NextRequest } from "next/server";
import { adminLogin } from "@/repository/admin.repository";
import { adminLoginValidator } from "@/validators/adminlogin.validator";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
    console.log("🔐 [API /adminlogin] POST request received");

    try {
        const body = await request.json();
        console.log("📧 [API /adminlogin] Request body email:", body.email);

        // ✅ Validate request body
        const validation = adminLoginValidator.safeParse(body);
        if (!validation.success) {
            console.log("❌ [API /adminlogin] Validation failed:", validation.error.flatten().fieldErrors);
            return NextResponse.json(
                {
                    status: false,
                    message: "Invalid request",
                    errors: validation.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const { email, password } = validation.data;

        // ✅ Authenticate admin
        console.log("🔍 [API /adminlogin] Authenticating admin...");
        const loginResult = await adminLogin(email, password);

        if (!loginResult.status) {
            console.log("❌ [API /adminlogin] Authentication failed:", loginResult.message);
            return NextResponse.json(
                { status: false, message: loginResult.message },
                { status: 401 }
            );
        }

        console.log("✅ [API /adminlogin] Authentication successful");

        // ✅ Generate JWT token
        const token = jwt.sign(
            {
                email,
                role: "admin",
                timestamp: Date.now()
            },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "7d" }
        );

        console.log("🎫 [API /adminlogin] Token generated:", token.substring(0, 30) + "...");

        // ✅ Return token in response (will be stored in localStorage by client)
        const response = NextResponse.json({
            status: true,
            message: "Login successful",
            token,
        });

        // ✅ Also set cookie as backup (for middleware)
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        console.log("✅ [API /adminlogin] Response ready with token");
        return response;
    } catch (error) {
        console.error("❌ [API /adminlogin] Error:", error);
        return NextResponse.json(
            { status: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
};