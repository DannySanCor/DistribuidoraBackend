import { Schema } from 'mongoose';

export const SocioSchema = new Schema({
  partnerName: { type: String, required: true },
  birthday: Date,
  address: {
    address: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    cp: { type: String, required: true },
  },
  phoneNumber: Number,
  description: String,
  imageUrl: String,
  idPartner: Number,
  totalVolume: String,
  levelVol: String,
  levelStatus: String,
  countRecruited: String,
  levelRecruited: String,
  levelRecruitedStatus: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tagActive: Number,
  tagDelete: Number,
});
