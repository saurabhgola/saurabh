import { NextResponse } from "next/server";
import { restaurantSchema } from "../../lib/restaurantModel";
import mongoose from "mongoose";


export async function  GET(request){
    let queryParams= request.nextUrl.searchParams 
    let filter={}
    if(queryParams.get("location")){
        let city= queryParams.get("location")
        filter={city:{$regex: new RegExp(city,'i')}}
        // filter.city=queryParams.get("location")
     }else if(queryParams.get("restaurant")){
        let restaurantName= queryParams.get("restaurant")
        filter={restaurantName:{$regex: new RegExp(restaurantName,'i')}}
     }   
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    let result=await restaurantSchema.find(filter);

    return NextResponse.json({success:true,result})
}