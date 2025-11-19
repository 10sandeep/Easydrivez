import { NextRequest, NextResponse } from "next/server";
import ConnectDb from "@/middleware/connectMongoDb";
import Bike from "@/models/Bike";
import cloudinary from "@/lib/cloudinary";

export const POST = async (request: NextRequest) => {
    try {
        await ConnectDb();

        const formData = await request.formData();

        // 🏍️ Extract all fields
        const brand = formData.get("brand") as string;
        const model = formData.get("model") as string;
        const seater = Number(formData.get("seater"));
        const type = formData.get("type") as string; // Sports / Adventure / Cruise
        const cc = Number(formData.get("cc"));
        const rating = Number(formData.get("rating"));
        const category = formData.get("category") as string; // Classic / High Speed / Premium
        const priceFor12Hours = Number(formData.get("priceFor12Hours"));
        const priceFor24Hours = Number(formData.get("priceFor24Hours"));
        const description = formData.get("description") as string;
        const imageFile = formData.get("bikeImage") as File | null;

        // 🚨 Validate all required fields
        if (
            !brand ||
            !model ||
            !seater ||
            !type ||
            !cc ||
            !category ||
            !imageFile ||
            isNaN(priceFor12Hours) ||
            isNaN(priceFor24Hours)
        ) {
            return NextResponse.json(
                { status: false, message: "Missing or invalid fields" },
                { status: 400 }
            );
        }

        // ✅ Upload image to Cloudinary
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: "bikes" }, (error, result) => {
                    if (error || !result) reject(error);
                    else resolve(result);
                })
                .end(buffer);
        });

        // ✅ Save bike in MongoDB
        const newBike = new Bike({
            bikeImage: uploadResult.secure_url,
            brand,
            model,
            seater,
            type,
            cc,
            rating,
            category,
            priceFor12Hours,
            priceFor24Hours,
            available: true, // default availability
            description
        });

        await newBike.save();

        return NextResponse.json(
            {
                status: true,
                message: "✅ Bike added successfully",
                bike: newBike,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("❌ Error creating bike:", error);
        return NextResponse.json(
            { status: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
