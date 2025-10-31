import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { token } = await req.json();
        if (!token) {
            return NextResponse.json({ status: false, message: "Missing token" }, { status: 400 });
        }

        const res = NextResponse.json({ status: true, message: "Cookie set successfully" });
        res.cookies.set("token", token, {
            httpOnly: true, // ✅ Secure from JS access
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60, // 1 hour
            path: "/",
        });

        return res;
    } catch (err) {
        console.error("Cookie set error:", err);
        return NextResponse.json({ status: false, message: "Internal Server Error" }, { status: 500 });
    }
}
