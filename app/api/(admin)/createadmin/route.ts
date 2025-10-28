export const dynamic = "force-dynamic";

import { NextResponse, NextRequest } from "next/server";
import { adminLoginCreateValidator } from "@/validators/adminlogin.validator";
import { createAdmin } from "@/repository/admin.repository";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        console.log(body);

        // ✅ Separate central admin password
        if (body.adminPassword !== process.env.CENTRAL_ADMIN_PASSWORD) {
            return NextResponse.json(
                { status: false, message: "Unauthorized access" },
                { status: 401 }
            );
        }

        // ✅ Validate admin details
        const validation = adminLoginCreateValidator.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {
                    status: false,
                    message: "Invalid request",
                    errors: validation.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const { username, email, password, img, phone } = validation.data;

        // ✅ Create the new admin
        const createResult = await createAdmin(username, email, password, img, phone);
        if (!createResult.status) {
            return NextResponse.json(
                { status: false, message: createResult.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { status: true, message: "Admin created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Create admin error:", error);
        return NextResponse.json(
            { status: false, message: "Internal Server Error: " + error },
            { status: 500 }
        );
    }
};
