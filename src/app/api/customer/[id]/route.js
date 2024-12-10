import { NextResponse } from "next/server";
import { restaurantSchema } from "../../../lib/restaurantModel";
import mongoose from "mongoose";
import { foodSchema } from "../../../lib/foodsmodel";

export async function GET(request, content) {
  const id = content.params.id;
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  const details = await restaurantSchema.findOne({ _id: id });
  const foodItems = await foodSchema.find({
    resto_id: id,
  });
  return NextResponse.json({ success: true, details, foodItems });
}
