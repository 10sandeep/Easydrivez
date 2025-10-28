import { NextResponse } from "next/server";
import ConnectDb from "@/middleware/connectMongoDb";
import Booking from "@/models/Booking";
import { sendBookingApprovalEmail, sendBookingRejectionEmail } from "@/lib/mailer";

interface Params {
    params: { id: string };
}

// 🔍 GET Single Booking by ID
export async function GET(request: Request, { params }: Params) {
    try {
        await ConnectDb();

        const { id } = params;
        const booking = await Booking.findById(id);

        if (!booking) {
            return NextResponse.json(
                { success: false, message: "Booking not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, booking }, { status: 200 });
    } catch (error) {
        console.error("Error fetching booking:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// 🧾 PATCH: Approve / Reject Booking
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        await ConnectDb();
        const { id } = params;
        const { status } = await req.json();

        if (!["approved", "rejected"].includes(status)) {
            return NextResponse.json(
                { success: false, message: "Invalid status value" },
                { status: 400 }
            );
        }

        const booking = await Booking.findById(id);
        if (!booking) {
            return NextResponse.json(
                { success: false, message: "Booking not found" },
                { status: 404 }
            );
        }

        booking.status = status;
        await booking.save();

        // ✅ Send corresponding email
        if (status === "approved") {
            await sendBookingApprovalEmail(booking);
        } else {
            await sendBookingRejectionEmail(booking);
        }

        return NextResponse.json(
            {
                success: true,
                message: `Booking ${status} successfully`,
                booking,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating booking status:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}