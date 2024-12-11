import mongoose from "mongoose";
import { foodSchema } from "../../../../../lib/foodsmodel";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  const id = content.params.id;
  let success = false;
  // await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
  await mongoose.connect(process.env.MONGODB_URI);

  const result = await foodSchema.findOne({ _id: id });
  if(result){
    success= true;
  }
  return NextResponse.json({result, success});
}

export async function PUT(request,content){
    const id= content.params.id;
    const payload=await request.json();
    let success=false;
    // await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    await mongoose.connect(process.env.MONGODB_URI);

    const result =await foodSchema.findOneAndUpdate({_id:id},payload)
    if(result){
      success=true
    }
return NextResponse.json({result,success})
}
