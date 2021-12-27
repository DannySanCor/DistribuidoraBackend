import { Schema } from "mongoose";

export const SocioSchema = new Schema ({
     partnerName:{type: String, required:true},
    birthday:Date,
    address:String,
    phoneNumber:Number,
    description:String,
    imageUrl:String,
    idPartner:Number,
    totalVolume:String,
    levelVol:String,
    levelStatus:String,
    countRecruited:String,
    levelRecruited:String,
    levelRecruitedStatus:String,
    createdAt: {
        type: Date,
        default:Date.now
    },
    tagActive:Number,
    tagDelete:Number
});