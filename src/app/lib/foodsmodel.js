import mongoose from "mongoose";

const fooModel = new mongoose.Schema({
  name: String,
  price: Number,
  img_path: String,
  description: String,
  resto_id: mongoose.Schema.Types.ObjectId,
});


 const foodSchema =
  mongoose.models.newfooditems || mongoose.model("newfooditems", fooModel);
  export { foodSchema };