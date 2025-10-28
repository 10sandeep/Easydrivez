import { NextResponse } from "next/server";
import ConnectDb from "@/middleware/connectMongoDb";
import Booking from "@/models/Booking";
import { sendBookingEmail } from "@/lib/mailer";

// 🧾 CREATE a Booking (User)
export async function POST(req: Request) {
    try {
        await ConnectDb();
        const data = await req.json();

        if (!data.vehicleId || !data.customer || !data.rental) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const booking = new Booking(data);
        await booking.save();

        await sendBookingEmail(data);

        return NextResponse.json(
            { success: true, message: "Booking created successfully and Successfully Sent mail", booking },
            { status: 201 }
        );
    } catch (error) {
        console.error("Booking creation error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// 🧾 GET All Bookings (Admin)
export async function GET() {
    try {
        await ConnectDb();
        const bookings = await Booking.find().sort({ createdAt: -1 });

        return NextResponse.json(
            { success: true, count: bookings.length, bookings },
            { status: 200 }
        );
    } catch (error) {
        console.error("Fetch bookings error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch bookings" },
            { status: 500 }
        );
    }
}
