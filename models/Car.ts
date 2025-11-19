import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICar extends Document {
    carPicturate: string; // Cloudinary URL
    vehicleType: string;
    brand: string;
    modelName: string;
    fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
    transmission: "Manual" | "Automatic";
    seatingCapacity: number;
    priceFor12Hours: number;
    priceFor24Hours: number;
    available: boolean;
    description: string;   // <-- Added
    createdAt?: Date;
}

const CarSchema = new Schema<ICar>(
    {
        carPicturate: { type: String, required: true },
        vehicleType: { type: String, required: true },
        brand: { type: String, required: true },
        modelName: { type: String, required: true },
        fuelType: {
            type: String,
            enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
            required: true,
        },
        transmission: {
            type: String,
            enum: ["Manual", "Automatic"],
            required: true,
        },
        seatingCapacity: { type: Number, required: true },
        priceFor12Hours: { type: Number, required: true },
        priceFor24Hours: { type: Number, required: true },
        available: { type: Boolean, default: true },
        description: { type: String, required: true },  // <-- Added
    },
    { timestamps: true }
);

const Car: Model<ICar> =
    mongoose.models.Car || mongoose.model("Car", CarSchema);

export default Car;
