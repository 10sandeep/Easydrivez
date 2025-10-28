import { NextRequest, NextResponse } from "next/server";
import ConnectDb from "@/middleware/connectMongoDb";
import Bike from "@/models/Bike";
import cloudinary from "@/lib/cloudinary";

// ✅ GET — public (no token required)
export async function GET() {
    try {
        await ConnectDb();
        const bikes = await Bike.find();
        return NextResponse.json({ status: true, bikes }, { status: 200 });
    } catch (error) {
        console.error("Error fetching bikes:", error);
        return NextResponse.json({ status: false, message: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ PUT — admin only (update bike)
export async function PUT(request: NextRequest) {
    try {
        await ConnectDb();
        const body = await request.json();

        const { id, ...updateData } = body;
        if (!id) {
            return NextResponse.json({ status: false, message: "Bike ID is required" }, { status: 400 });
        }

        const updatedBike = await Bike.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedBike) {
            return NextResponse.json({ status: false, message: "Bike not found" }, { status: 404 });
        }

        return NextResponse.json({ status: true, message: "Bike updated successfully", bike: updatedBike }, { status: 200 });
    } catch (error) {
        console.error("Error updating bike:", error);
        return NextResponse.json({ status: false, message: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ DELETE — admin only (delete bike & image from Cloudinary)
export async function DELETE(request: NextRequest) {
    try {
        await ConnectDb();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ status: false, message: "Bike ID is required" }, { status: 400 });
        }

        const bike = await Bike.findById(id);
        if (!bike) {
            return NextResponse.json({ status: false, message: "Bike not found" }, { status: 404 });
        }

        // Delete image from Cloudinary
        if (bike.bikeImage) {
            const publicId = bike.bikeImage.split("/").pop()?.split(".")[0];
            if (publicId) await cloudinary.uploader.destroy(`bikes/${publicId}`);
        }

        await bike.deleteOne();
        return NextResponse.json({ status: true, message: "Bike deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting bike:", error);
        return NextResponse.json({ status: false, message: "Internal Server Error" }, { status: 500 });
    }
}
