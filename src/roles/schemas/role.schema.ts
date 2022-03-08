import { Schema } from 'mongoose';

export const roleSchema = new Schema({
  numberRole: { type: Number, required: true },
  nameRole: { type: String, required: true },
  statusRole: { type: Number, required: true },
  tagActive: { type: Number, required: false },
  tagDelete: { type: Number, required: false },
});
