import { ObjectId } from 'mongoose';
export class CreateOrderDTO {
  createdAt: Date;
  updatedAt: Date;
  closeOrderDate: Date;
  idPartner: ObjectId;
  totalSale: number;
  profit: number;
  statusOrder: number;
  closedBy: ObjectId;
  orderDebt: number;
  Products: [
    {
      _id: ObjectId;
      code: string;
      size: string;
      price: number;
      priceDiscount: number;
      priceDistr: number;
      statusProduct: number;
      status: number;
    },
  ];
  Payments?: [
    {
      _id: ObjectId;
      createdAt: Date;
      amount: number;
      type: number;
      status: number;
    },
  ];
}
