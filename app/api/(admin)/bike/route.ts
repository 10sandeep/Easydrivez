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
// ✅ PUT — admin only (update bike)
export async function PUT(request: NextRequest) {
    try {
        await ConnectDb();

        const formData = await request.formData();

        const id = formData.get("id") as string | null;
        const brand = formData.get("brand") as string;
        const model = formData.get("model") as string;
        const available = formData.get("available") === "true";
        const seater = Number(formData.get("seater"));
        const type = formData.get("type") as string;
        const cc = Number(formData.get("cc"));
        const rating = Number(formData.get("rating"));
        const category = formData.get("category") as string;
        const priceFor12Hours = Number(formData.get("priceFor12Hours"));
        const priceFor24Hours = Number(formData.get("priceFor24Hours"));
        const bikeImage = formData.get("bikeImage");

        if (!id) {
            return NextResponse.json(
                { status: false, message: "Bike ID is required" },
                { status: 400 }
            );
        }

        let imageUrl: string;

        if (bikeImage instanceof File) {
            const bytes = await bikeImage.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResult = await new Promise<{ secure_url: string }>(
                (resolve, reject) => {
                    cloudinary.uploader
                        .upload_stream({ folder: "bikes" }, (error, result) => {
                            if (error || !result) reject(error);
                            else resolve(result);
                        })
                        .end(buffer);
                }
            );

            imageUrl = uploadResult.secure_url;
        } else {
            imageUrl = bikeImage as string;
        }

        const updatedBike = await Bike.findByIdAndUpdate(
            id,
            {
                brand,
                model,
                bikeImage: imageUrl,
                available,
                seater,
                type,
                cc,
                rating,
                category,
                priceFor12Hours,
                priceFor24Hours,
            },
            { new: true }
        );

        if (!updatedBike) {
            return NextResponse.json(
                { status: false, message: "Bike not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                status: true,
                message: "Bike updated successfully",
                bike: updatedBike,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating bike:", error);
        return NextResponse.json(
            { status: false, message: "Internal Server Error" },
            { status: 500 }
        );
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
