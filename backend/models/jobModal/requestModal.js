import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence";

const requestSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product", 
    required: true 
  },  
  quantity: { 
    type: Number, 
    required: true 
  },  
  totalPrice: { 
    type: Number, 
    required: true 
  },  
  orderNumber: { 
    type: Number, 
    unique: true 
  },  
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },  
  receiver: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },  
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Finished', 'Cancelled'],
    default: 'Pending',
  },
  createdBy: { 
    type: String, 
    ref: "User", 
    required: true 
  },  
  createdDate: { 
    type: Date, 
    default: Date.now 
  },  
});

// Apply the auto-increment plugin
requestSchema.plugin(AutoIncrement(mongoose), { inc_field: "orderNumber" });

const Request = mongoose.model("Request", requestSchema);

export { Request };
