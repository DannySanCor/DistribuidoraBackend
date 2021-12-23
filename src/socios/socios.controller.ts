import { Controller,Get,Post,Put,Delete, Res, HttpStatus, Body, Param ,NotFoundException, Query} from '@nestjs/common';
import { Request } from 'express';

import { SociosService } from "./socios.service";
import { CreatePartnerDTO } from './dto/socio.dto';
import { Public } from 'src/auth/custom-decorator';
@Controller('socios')
export class SociosController {

    constructor(private sociosService:SociosService){

    }

@Post('/create')
 async createPost(@Res() res, @Body() createPartnerDTO: CreatePartnerDTO){
     
    const lastSocio:any = await this.getLastSocio();
    console.log(lastSocio);
     createPartnerDTO.idPartner = lastSocio[0].idPartner + 1;
     createPartnerDTO.tagActive = 1;
     createPartnerDTO.tagDelete = 0;
     console.log(createPartnerDTO);
    const socio = await this.sociosService.createSocio(createPartnerDTO);  
    return res.status(HttpStatus.OK).json({
        message:'Nuevo Socio Registrado Satisfactoriamente',
        socio: socio
    });
}
//Con decorador Public no hay necesidad de generar token
@Public()
@Get('/')
async getSocios(@Res() res)
{
    const partners = await this.sociosService.getSocios();
   return res.status(HttpStatus.OK).json({
        message:"Socios Registrados",
        partners
    })
}
@Public()
@Get('/lastPartner')
async getLastSocio()
{
    const Lastpartner = await this.sociosService.getLastSocio();
   return Lastpartner;
}

@Get('/:socioID')
async getSocio(@Res() res, @Param('socioID') socioID)
{
    const partner = await this.sociosService.getSocio(socioID);
    if(!partner) throw new NotFoundException('Socio no registrado')
   return res.status(HttpStatus.OK).json(partner)
}

@Delete('/delete')
async deleteSocio(@Res() res, @Query('socioID') socioID)
{
    const socioDeleted = await this.sociosService.deleteSocio(socioID);
    if(!socioID) throw new NotFoundException('Socio no registrado');
    return res.status(HttpStatus.OK).json({
        message: 'Socio Eliminado Satisfactoriamente',
        socioDeleted
    }) 
}

@Put('/update')
async updateSocio(@Res() res, @Body() createSocioDTO:CreatePartnerDTO, @Query('socioID') socioID)
{
   const socioUpdated = await this.sociosService.updateSocio(socioID,createSocioDTO);

   if(!socioUpdated) throw new NotFoundException('Socio no registrado');
    return res.status(HttpStatus.OK).json({
        message: 'Socio Actualizado Satisfactoriamente',
        socioUpdated
    }) 

}

}
