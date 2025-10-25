import { NextResponse,NextRequest } from "next/server";

import jwt from "jsonwebtoken";
export const GET = async (request: NextRequest) => {
    try{
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET || "default_secret", (err, decoded) => {
            if (err) {
                return NextResponse.json({ status: false, message: "Unauthorized" }, { status: 401 });
            }
            return NextResponse.json({ status: true, message: "Token is valid", user: decoded }, { status: 200 });
        });
    }
    catch(error){
        return NextResponse.json({ status: false, message: "Internal Server Error" }, { status: 500 });
    }
}