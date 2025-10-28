import { NextRequest, NextResponse } from "next/server";
import ConnectDb from "@/middleware/connectMongoDb";
import Car from "@/models/Car";
import cloudinary from "@/lib/cloudinary";

// ✅ GET — public (no token required)
export async function GET() {
    try {
        await ConnectDb();
        const cars = await Car.find();
        return NextResponse.json({ status: true, cars }, { status: 200 });
    } catch (error) {
        console.error("Error fetching cars:", error);
        return NextResponse.json({ status: false, message: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ PUT — admin only (update car)
export async function PUT(request: NextRequest) {
    try {
        await ConnectDb();
        const body = await request.json();

        const { id, ...updateData } = body;
        if (!id) {
            return NextResponse.json({ status: false, message: "Car ID is required" }, { status: 400 });
        }

        const updatedCar = await Car.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedCar) {
            return NextResponse.json({ status: false, message: "Car not found" }, { status: 404 });
        }

        return NextResponse.json({ status: true, message: "Car updated successfully", car: updatedCar }, { status: 200 });
    } catch (error) {
        console.error("Error updating car:", error);
        return NextResponse.json({ status: false, message: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ DELETE — admin only (delete car & image from Cloudinary)
export async function DELETE(request: NextRequest) {
    try {
        await ConnectDb();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ status: false, message: "Car ID is required" }, { status: 400 });
        }

        const car = await Car.findById(id);
        if (!car) {
            return NextResponse.json({ status: false, message: "Car not found" }, { status: 404 });
        }

        // Delete image from Cloudinary
        if (car.carPicturate) {
            const publicId = car.carPicturate.split("/").pop()?.split(".")[0];
            if (publicId) await cloudinary.uploader.destroy(`cars/${publicId}`);
        }

        await car.deleteOne();
        return NextResponse.json({ status: true, message: "Car deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting car:", error);
        return NextResponse.json({ status: false, message: "Internal Server Error" }, { status: 500 });
    }
}
