import mongoose, { Schema, Document, models } from "mongoose";

export interface IBooking extends Document {
    vehicleId: string;
    vehicleType: "car" | "bike";
    vehicleDetails: {
        brand: string;
        model: string;
        image?: string;
        type?: string;
        cc?: number;
        seater?: number;
        category?: string;
    };
    customer: {
        name: string;
        email: string;
        mobile: string;
    };
    rental: {
        pickupDate: string;
        pickupTime: string;
        dropoffDate: string;
        dropoffTime: string;
        duration: string;
        totalPrice: string;
    };
    status: "pending" | "approved" | "rejected" | "completed";
    createdAt: Date;
}

const VehicleDetailsSchema = new Schema(
    {
        brand: { type: String },
        model: { type: String },
        image: { type: String },
        type: { type: String },
        cc: { type: Number },
        seater: { type: Number },
        category: { type: String },
    },
    { _id: false }
);

const CustomerSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: String, required: true },
    },
    { _id: false }
);

const RentalSchema = new Schema(
    {
        pickupDate: { type: String, required: true },
        pickupTime: { type: String, required: true },
        dropoffDate: { type: String, required: true },
        dropoffTime: { type: String, required: true },
        duration: { type: String, required: true },
        totalPrice: { type: String, required: true },
    },
    { _id: false }
);

const BookingSchema = new Schema<IBooking>(
    {
        vehicleId: { type: String, required: true },
        vehicleType: { type: String, enum: ["car", "bike"], required: true },
        vehicleDetails: { type: VehicleDetailsSchema, required: true },
        customer: { type: CustomerSchema, required: true },
        rental: { type: RentalSchema, required: true },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected", "completed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const Booking = models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
export default Booking;
