import { NextResponse, NextRequest } from "next/server";
import { adminLogin } from "@/repository/admin.repository";
import { adminLoginValidator } from "@/validators/adminlogin.validator";
import jwt from "jsonwebtoken";
export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const validation = adminLoginValidator.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: "Invalid request", errors: validation.error.flatten().fieldErrors }, { status: 400 });
        }
        const { email, password } = validation.data;
        const loginResult = await adminLogin(email, password);
        if (!loginResult.status) {
            return NextResponse.json({ status: false, message: loginResult.message }, { status: 401 });
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });
        return NextResponse.json({ status: true, message: "Login successful", token }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ status: false, message: "Internal Server Error" }, { status: 500 });
    }
}