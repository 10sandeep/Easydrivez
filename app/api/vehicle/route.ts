import { NextResponse } from "next/server";
import Car from "@/models/Car";
import Bike from "@/models/Bike";
import Booking from "@/models/Booking";
import ConnectDb from "@/middleware/connectMongoDb";



export async function POST(req: Request) {
  try {
    await ConnectDb()

    const {
      vehicleType,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
    } = await req.json();

    // Combine date and time for comparison
    const pickupDateTime = new Date(`${pickupDate} ${pickupTime}`);
    const dropoffDateTime = new Date(`${dropoffDate} ${dropoffTime}`);

    // Find booked vehicles overlapping with requested time
    const bookedVehicles = await Booking.find({
      vehicleType,
      $or: [
        {
          "rental.pickupDate": { $lte: dropoffDate },
          "rental.dropoffDate": { $gte: pickupDate },
        },
      ],
    }).select("vehicleId");

    const bookedIds = bookedVehicles.map((b) => b.vehicleId);



    //@ts-ignore
    let availableVehicles = [];
    if (vehicleType === "car") {
      availableVehicles = await Car.find({
        _id: { $nin: bookedIds },
        available: true,
      });
    } else if (vehicleType === "bike") {
      availableVehicles = await Bike.find({
        _id: { $nin: bookedIds },
        available: true,
      });
    }


    //@ts-ignore
    return NextResponse.json({
      success: true,
      //@ts-ignore
      data: availableVehicles,
    });
  } catch (error:any) {
    console.error("error in fetching the vehicles",error.message);
    return NextResponse.json(
      { success: false, message: "Error finding vehicles" },
      { status: 500 }
    );
  }
}
