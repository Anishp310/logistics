import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const jobSchema = new mongoose.Schema({
  consigneeDetails: {
    consigneeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    consigneeName: { type: String, required: true },
  },
  consignerDetails: {
    consignerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    consignerName: { type: String, required: true },
  },
  billingDetails: {
    billingAddress: { type: String, required: true },
    billingContact: { type: String, required: true },
  },
  jobInformation: {
    containerType: { type: String, required: true },
    weight: { type: Number, required: true },
    status: {
      type: String,
      default: 'pending',
      required: true,
    },
  },
  dateAndTime: {
    getOutTime: { type: Date, required: true },
    estimatedArrivalTime: { type: Date, required: true },
  },
  locationDetails: {
    loadingPortAirport: { type: String, required: true },
    finalDestination: { type: String, required: true },
  },
  additionalInformation: {
    commodityName: { type: String, required: true },
  },
  productDetails: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      productName: { type: String, required: true },
      productQuantity: { type: Number, required: true },
      productValue: { type: Number, required: true },
      productPrice: { type: Number, required: true },
    }
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdDate: { type: Date, default: Date.now },
  blNumberAeroBill: { type: String, unique: true },
});

// Pre-save hook to ensure `blNumberAeroBill` is unique and generates a UUID if not provided
jobSchema.pre('save', async function (next) {
  if (!this.blNumberAeroBill) {
    const customName = 'Job';
    this.blNumberAeroBill = `${customName}-${uuidv4()}`;
  }

  try {
    await this.constructor.findOne({ blNumberAeroBill: this.blNumberAeroBill });
  } catch (error) {
    if (error.code === 11000) {
      this.blNumberAeroBill = `${customName}-${uuidv4()}`;
      return next();
    }
  }

  next();
});

const Job = mongoose.model('Job', jobSchema);

export { Job };
