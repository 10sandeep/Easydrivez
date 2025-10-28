import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBike extends Document {
    bikeImage: string; // Cloudinary URL
    brand: string;
    model: string;
    seater: number;
    type: "Sports" | "Adventure" | "Cruise";
    cc: number;
    rating: number;
    priceFor12Hours: number;
    priceFor24Hours: number;
    category: "Classic" | "High Speed" | "Premium";
    available: boolean;
    createdAt?: Date;
}

const BikeSchema = new Schema<IBike>(
    {
        bikeImage: { type: String, required: true },
        brand: { type: String, required: true },
        model: { type: String, required: true },
        seater: { type: Number, required: true },
        type: {
            type: String,
            enum: ["Sports", "Adventure", "Cruise"],
            required: true,
        },
        cc: { type: Number, required: true },
        rating: { type: Number, default: 0 },
        priceFor12Hours: { type: Number, required: true },
        priceFor24Hours: { type: Number, required: true },
        category: {
            type: String,
            enum: ["Classic", "High Speed", "Premium"],
            required: true,
        },
        available: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Bike: Model<IBike> = mongoose.models.Bike || mongoose.model("Bike", BikeSchema);
export default Bike;
