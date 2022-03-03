
import { Schema, ObjectId,Types  } from 'mongoose';
import { Code, ObjectID } from 'typeorm';

const productSchema = new Schema({
    code:String,
    size:String,
    price:Number,
    priceDiscount:Number,
    priceDistr:Number,
    statusProduct:Number,
    status:Number
});
const paymentsSchema = new Schema({
        createdAt: {
            type: Date,
            default:Date.now
        }, 
        amount:Number,
        type:Number,
        status:Number
})
export const OrderSchema = new Schema({
    createdAt: {
        type: Date,
        default:Date.now
    }, 
    updatedAt: {
        type: Date,
        default:Date.now
    }, 
    closeOrderDate: {
        type: Date,
        default:Date.now
    }, 
    idPartner:{ type: Schema.Types.ObjectId, ref: 'Socio'},
    totalSale:Number,
    profit:Number,
    statusOrder:{type:Number,default:0},
    closedBy:{type: Schema.Types.ObjectId, ref: 'User'},
    orderDebt:Number,
    Products: [productSchema] ,
    Payments: [paymentsSchema]
});



