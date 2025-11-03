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

        const formData = await request.formData();

        const id = formData.get("id") as string | null;
        const brand = formData.get("brand") as string;
        const modelName = formData.get("modelName") as string;
        const available = formData.get("available") === "true";
        const vehicleType = formData.get("vehicleType") as string;
        const fuelType = formData.get("fuelType") as string;
        const transmission = formData.get("transmission") as string;
        const seatingCapacity = Number(formData.get("seatingCapacity"));
        const priceFor12Hours = Number(formData.get("priceFor12Hours"));
        const priceFor24Hours = Number(formData.get("priceFor24Hours"));
        const carPicturate = formData.get("carPicturate");

        if (!id) {
            return NextResponse.json(
                { status: false, message: "Car ID is required" },
                { status: 400 }
            );
        }

        let imageUrl: string;

        // Check if carPicturate is a File (new upload) or string (existing URL)
        if (carPicturate instanceof File) {
            // ✅ Upload new image to Cloudinary
            const bytes = await carPicturate.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({ folder: "cars" }, (error, result) => {
                        if (error || !result) reject(error);
                        else resolve(result);
                    })
                    .end(buffer);
            });

            imageUrl = uploadResult.secure_url;
        } else {
            // Use existing URL
            imageUrl = carPicturate as string;
        }

        // Update car in database
        const updatedCar = await Car.findByIdAndUpdate(
            id,
            {
                brand,
                modelName,
                carPicturate: imageUrl,
                available,
                vehicleType,
                fuelType,
                transmission,
                seatingCapacity,
                priceFor12Hours,
                priceFor24Hours,
            },
            { new: true }
        );

        if (!updatedCar) {
            return NextResponse.json(
                { status: false, message: "Car not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            status: true,
            message: "Car updated successfully",
            car: updatedCar,
        }, { status: 200 });
    } catch (error) {
        console.error("Error updating car:", error);
        return NextResponse.json(
            { status: false, message: "Internal Server Error" },
            { status: 500 }
        );
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