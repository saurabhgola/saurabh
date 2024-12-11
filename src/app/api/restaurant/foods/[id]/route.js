import { NextResponse } from "next/server";
import { foodSchema } from "../../../../lib/foodsmodel";
import mongoose from "mongoose";

export async function GET(request, content) {
  const id = content.params.id;
  let success = false;
  // await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  await mongoose.connect(process.env.MONGODB_URI);

  const result = await foodSchema.find({ resto_id: id });
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}

export async function DELETE(request, content) {
  const id = content.params.id;
  let success = false;
  // await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  await mongoose.connect(process.env.MONGODB_URI);

  const result = await foodSchema.deleteOne({ _id: id });
  if (result.deletedCount > 0) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
