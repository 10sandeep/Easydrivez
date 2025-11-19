import { NextRequest, NextResponse } from "next/server";
import ConnectDb from "@/middleware/connectMongoDb";
import Car from "@/models/Car";
import cloudinary from "@/lib/cloudinary";

export const POST = async (request: NextRequest) => {
    try {
        await ConnectDb();

        const formData = await request.formData();

        const vehicleType = formData.get("vehicleType") as string;
        const brand = formData.get("brand") as string;
        const modelName = formData.get("modelName") as string;
        const fuelType = formData.get("fuelType") as string;
        const transmission = formData.get("transmission") as string;
        const seatingCapacity = Number(formData.get("seatingCapacity"));
        const priceFor12Hours = Number(formData.get("priceFor12Hours"));
        const priceFor24Hours = Number(formData.get("priceFor24Hours"));
        const description = formData.get("description") as string;
        const imageFile = formData.get("carPicturate") as File | null;

        if (
            !vehicleType ||
            !brand ||
            !modelName ||
            !fuelType ||
            !transmission ||
            !seatingCapacity ||
            !priceFor12Hours ||
            !priceFor24Hours ||
            !imageFile
        ) {
            return NextResponse.json(
                { status: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        // ✅ Upload image to Cloudinary
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: "cars" }, (error, result) => {
                    if (error || !result) reject(error);
                    else resolve(result);
                })
                .end(buffer);
        });

        // ✅ Save in MongoDB
        const newCar = new Car({
            carPicturate: uploadResult.secure_url,
            vehicleType,
            brand,
            modelName,
            fuelType,
            transmission,
            seatingCapacity,
            priceFor12Hours,
            priceFor24Hours,
            description,
        });

        await newCar.save();

        return NextResponse.json(
            { status: true, message: "Car added successfully", car: newCar },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating car:", error);
        return NextResponse.json(
            { status: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
