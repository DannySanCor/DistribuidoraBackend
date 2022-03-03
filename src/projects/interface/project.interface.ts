import { Document } from 'mongoose';
export interface Project extends Document {
  readonly bussinessName: string;
  readonly address: {
    address: string;
    country: string;
    state: string;
    city: string;
    cp: string;
  };
  readonly aboutUs: {
    contactNumber: number;
    contactEmail: string;
    comments: string;
  };
  readonly currentDiscount: number;
  readonly versionApp: string;
  readonly scheduleAtention: string;
  readonly createdAt: Date;
  readonly tagActive: number;
  readonly tagDelete: number;
}
