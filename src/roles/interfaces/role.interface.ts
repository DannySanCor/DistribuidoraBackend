import { Document } from 'mongoose';
export interface Role extends Document {
  readonly numberRole: number;
  readonly nameRole: string;
  readonly statusRole: number;
  readonly tagActive: number;
  readonly tagDelete: number;
}
