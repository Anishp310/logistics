import mongoose from "mongoose";



// Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  value: { type: Number, required: true },
  dimensions: { type: String, required: true },
  weight: { type: Number, required: true },
  type: { type: mongoose.Schema.Types.ObjectId, ref: "ProductType", required: true }, // Reference to ProductType
  nature: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductNature" }], // Reference to ProductNature
  hs_code: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Reference to User
}, { timestamps: true });


const Product = mongoose.model("Product", ProductSchema);

export { Product };
