import mongoose from "mongoose";

// Type Schema
const TypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Reference to the User model

}, { timestamps: true });



// Export Models
const ProductType = mongoose.model("ProductType", TypeSchema);


export { ProductType };
