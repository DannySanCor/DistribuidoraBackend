import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SociosService } from './socios.service';
import { CreatePartnerDTO } from './dto/socio.dto';
import { Public } from 'src/auth/custom-decorator';
@Controller('socios')
@ApiTags('Socios')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Not Authorize' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class SociosController {
  constructor(private sociosService: SociosService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createPartnerDTO: CreatePartnerDTO) {
    const lastSocio: any = await this.getLastSocio();
    createPartnerDTO.idPartner = lastSocio[0].idPartner + 1;
    createPartnerDTO.tagActive = 1;
    createPartnerDTO.tagDelete = 0;
    const socio = await this.sociosService.createSocio(createPartnerDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Nuevo socio registrado satisfactoriamente',
      socio: socio,
    });
  }
  //Con decorador Public no hay necesidad de generar token
  @Public()
  @Get('/')
  async getSocios(@Res() res) {
    const partners = await this.sociosService.getSocios();
    return res.status(HttpStatus.OK).json({
      message: 'Socios registrados',
      partners,
    });
  }
  @Public()
  @Get('/lastPartner')
  async getLastSocio() {
    const Lastpartner = await this.sociosService.getLastSocio();
    return Lastpartner;
  }

  @Get('/:socioID')
  async getSocio(@Res() res, @Param('socioID') socioID) {
    const partner = await this.sociosService.getSocio(socioID);
    if (!partner) throw new NotFoundException('Socio no registrado');
    return res.status(HttpStatus.OK).json(partner);
  }

  @Delete('/delete')
  async deleteSocio(@Res() res, @Query('socioID') socioID) {
    const socioDeleted = await this.sociosService.deleteSocio(socioID);
    if (!socioID) throw new NotFoundException('Socio no registrado');
    return res.status(HttpStatus.OK).json({
      message: 'Socio eliminado satisfactoriamente',
      socioDeleted,
    });
  }

  @Put('/update/:socioID')
  async updateSocio(
    @Res() res,
    @Body() createSocioDTO: CreatePartnerDTO,
    @Param('socioID') socioID,
  ) {
    const socioUpdated = await this.sociosService.updateSocio(
      socioID,
      createSocioDTO,
    );

    if (!socioUpdated) throw new NotFoundException('Socio no registrado');
    return res.status(HttpStatus.OK).json({
      message: 'Socio actualizado satisfactoriamente',
      socioUpdated,
    });
  }
}
