import { Controller,Get,Post,Put,Delete, Res, HttpStatus, Body } from '@nestjs/common';
import { Request } from 'express';
import { SociosService } from "./socios.service";
import {CreatePartnerDTO} from './dto/socio.dto'
@Controller('socios')
export class SociosController {

    constructor(private sociosService:SociosService){

    }
@Post('/create')
 async createPost(@Res() res, @Body() createPartnerDTO: CreatePartnerDTO){
    const socio = await this.sociosService.createSocio(createPartnerDTO);  
    return res.status(HttpStatus.OK).json({
        message:'received',
        socio: socio
    });
}

}
