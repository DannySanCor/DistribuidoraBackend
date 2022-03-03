import { Document } from 'mongoose';
export interface Socio extends Document {
  readonly partnerName: string;
  readonly birthday: Date;
  readonly address: {
    address: string;
    country: string;
    state: string;
    city: string;
    cp: string;
  };
  readonly phoneNumber: number;
  readonly description: string;
  readonly imageUrl: string;
  readonly idPartner: number;
  readonly totalVolume: string;
  readonly levelVol: string;
  readonly levelStatus: string;
  readonly countRecruited: string;
  readonly levelRecruited: string;
  readonly levelRecruitedStatus: string;
  readonly createdAt: Date;
  readonly tagActive: number;
  readonly tagDelete: number;
}
