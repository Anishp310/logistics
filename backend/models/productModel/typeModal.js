import mongoose from "mongoose";

// Type Schema
const TypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  
});



// Export Models
const ProductType = mongoose.model("ProductType", TypeSchema);


export { ProductType };
