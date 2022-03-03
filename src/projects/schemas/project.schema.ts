import { Schema } from 'mongoose';

export const projectSchema = new Schema({
  bussinessName: { type: String, required: true },
  address: {
    address: { type: String, required: false },
    country: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    cp: { type: String, required: false },
  },
  aboutUs: {
    contactNumber: { type: Number, required: true },
    contactEmail: { type: String, required: false },
    comments: { type: String, required: false },
  },
  currentDiscount: { type: Number, required: false },
  versionApp: { type: String, required: false },
  scheduleAtention: { type: String, required: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tagActive: Number,
  tagDelete: Number,
});
