import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Socio } from './interfaces/socio.interface';
import { CreatePartnerDTO } from './dto/socio.dto';


@Injectable()
export class SociosService {
  
    constructor(@InjectModel('Socio') private readonly socioModel: Model<Socio> ){
        
    }
    async getSocios(): Promise <Socio[]>
    {
      const socios =  await this.socioModel.find()
    return socios;
    }
    async getSocio(productID:string):Promise<Socio>
    {
        const socio = await this.socioModel.findById(productID);
        return socio;
    }
    async createSocio(createPartnerDTO:CreatePartnerDTO):Promise<Socio>
    {
        const socio =  new this.socioModel(createPartnerDTO);
        return await socio.save();
         
    }
   async deleteSocio(socioID: string): Promise<Socio>
    {
      const deletedSocio = await this.socioModel.findByIdAndDelete(socioID)
      return deletedSocio;
    }
    async updateSocio(socioID:string, createSocioDto:CreatePartnerDTO):Promise<Socio>
    {
       const updateSocio = await this.socioModel.findByIdAndUpdate(socioID,createSocioDto,{new:true});
       return updateSocio;
    }

}
 