import mongoose from "mongoose"

const TrackingSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now }, // Tracking date
  update: { type: String, required: true }, // Update description
  remarks: { type: String }, // Any additional remarks
  status: { type: String, enum: ["Pending", "In Transit", "Delivered", "Delayed"], required: true }, // Shipment status
  billNumber: { type: String, required: true }, // Bill Number
  trackingNumber: { type: String, unique: true, required: true }, // Unique Tracking ID
  masterTrackingNumber: { type: String, required: true }, // Master Tracking Number (Starts with MAX)
  transportPort: { type: String }, 
  destination: { type: String, required: true } // Final Destination
});

module.exports = mongoose.model("Tracking", TrackingSchema);
