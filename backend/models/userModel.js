import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["admin", "consignee", "consignor"], 
    required: true 
  },
  landmark: { type: String },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);
