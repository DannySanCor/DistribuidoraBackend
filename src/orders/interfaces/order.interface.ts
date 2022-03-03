import {Document, ObjectId} from 'mongoose';
import {Socio} from '../../socios/interfaces/socio.interface'


export interface Order extends Document{
    readonly    _id:ObjectId;
    readonly    createdAt:Date;
    readonly    updatedAt:Date; 
    readonly    closeOrderDate:Date;
    readonly    idPartner:ObjectId;
    readonly    totalSale:number;
    readonly    profit:number;
    readonly    statusOrder:number;
    readonly    closedBy:ObjectId;
    readonly    orderDebt:number;
    readonly    Products: [{
                    _id:ObjectId,
                    code:string,
                    size:string,
                    price:number,
                    priceDiscount:number,
                    priceDistr:number,
                    statusProduct:number,
                    status:number
                    }];
    readonly    Payments?: [{
                    _id:ObjectId,
                    createdAt:Date,
                    amount:number,
                    type:number,
                    status:number
                    }];
}