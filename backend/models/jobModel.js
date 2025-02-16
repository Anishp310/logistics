import mongoose from "mongoose"
const JobSchema = new mongoose.Schema({
  // ✅ Metadata (First for quick lookup)
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdDate: { type: Date, default: Date.now },

  // ✅ Consignee & Consigner Details
  consignee: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  consigner: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },

  // ✅ Shipment Details
  shipmentDetails: {
    getOutTime: { type: Date },
    estArrivalTime: { type: Date },
    loadingPort: { type: String, required: true },
    transit: { type: String, required: true },
    viaCustom: { type: Boolean, default: false },
    finalDestination: { type: String, required: true },
    blNumber: { type: String, unique: true, required: true },
    commodityName: { type: String, required: true }
  },

  // ✅ Product Details
  products: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    value: { type: Number, required: true },
    dimensions: { type: String, required: true },
    weight: { type: Number, required: true },
    type: { type: String, enum: ["Package", "Pallet", "Cartoon", "Rolled", "Drum"], required: true },
    nature: [{ type: String, enum: ["Handle with care", "Temperature maintain", "Dangerous goods", "Stackable"] }],
    hsCode: { type: String, required: true }
  }],

  // ✅ Billing Details
  billingDetails: {
    type: { type: String, enum: ["Container", "Weight"], required: true },
    status: { type: String, enum: ["Pending", "Active", "Draft"], required: true },
    totalAmount: { type: Number, required: true },
    taxAmount: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["Paid", "Unpaid", "Partially Paid"], required: true },
    paymentMethod: { type: String, enum: ["Cash", "Credit Card", "Bank Transfer", "UPI"], required: true },
    invoiceNumber: { type: String, unique: true, required: true },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verifiedDate: { type: Date }
  }
});

module.exports = mongoose.model("Job", JobSchema);
