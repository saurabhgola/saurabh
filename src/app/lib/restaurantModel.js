import mongoose from "mongoose";

// Define the schema for the restaurant collection
const restaurantModel = new mongoose.Schema({
  name: String,
  email:String,
  password:String,
  restaurantName:String,
city:String,
address:String,
contectNo:Number

});

const restaurantSchema =
  mongoose.models.usercomments ||
  mongoose.model("usercomments", restaurantModel);

export { restaurantSchema };
