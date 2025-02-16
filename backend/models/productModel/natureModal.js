import mongoose from "mongoose";

// Nature Schema
const NatureSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true } // Reference to the User model
}, { timestamps: true });

// Export Models
const ProductNature = mongoose.model("ProductNature", NatureSchema);

export { ProductNature };
