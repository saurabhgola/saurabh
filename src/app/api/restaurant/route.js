"use server";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { restaurantSchema } from "../../lib/restaurantModel"; // Correct import

export async function GET() {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Fetch data from the database
  const data = await restaurantSchema.find();
  console.log(data);

  // Return the data as a JSON response
  return NextResponse.json({ message: data });
}

export async function POST(request) {
  let payload = await request.json();
  let result;
  let success = false;
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  if (payload.login) {
    // use  is for login
    result = await restaurantSchema.findOne({
      email: payload.email,
      password: payload.password,
    });
    if (result) {
      success = true;
    }
  } else {
    const restaurant = new restaurantSchema(payload);
    result = await restaurant.save();
    if (result) {
      success = true;
    }
  }
  return NextResponse.json({ result, success });
}
