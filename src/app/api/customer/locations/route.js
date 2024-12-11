import { NextResponse } from "next/server";
import { restaurantSchema } from "../../../lib/restaurantModel";
import mongoose from "mongoose";

export async function GET(){
    // await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    await mongoose.connect(process.env.MONGODB_URI);
     let result=await restaurantSchema.find();
     result=result.map((item)=>item.city)
     result=[...new Set(result.map((item)=>item))]
    return NextResponse.json({success:true,result})
}