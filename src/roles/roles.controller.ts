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
import { Public } from 'src/auth/custom-decorator';
import { CreateteRoleDTO } from './dto/role.dto';
import { RolesService } from './roles.service';
@Controller('roles')
@ApiTags('Roles')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Not Authorize' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Post('/create')
  async createProject(@Res() res, @Body() createRoleDTO: CreateteRoleDTO) {
    createRoleDTO.tagActive = 1;
    createRoleDTO.tagDelete = 0;
    const role = await this.rolesService.createRole(createRoleDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Nuevo Rol registrado satisfactoriamente',
      rol: role,
    });
  }
  //Con decorador Public no hay necesidad de generar token
  @Public()
  @Get('/')
  async getRoles(@Res() res) {
    const roles = await this.rolesService.getRoles();
    return res.status(HttpStatus.OK).json({
      message: 'Roles registrados',
      roles,
    });
  }

  @Get('/:roleID')
  async getRol(@Res() res, @Param('roleID') roleID) {
    const role = await this.rolesService.getRole(roleID);
    if (!role) throw new NotFoundException('Rol no registrado');
    return res.status(HttpStatus.OK).json(role);
  }

  @Delete('/delete')
  async deleteRol(@Res() res, @Query('roleID') roleID) {
    const roleDeleted = await this.rolesService.deleteRole(roleID);
    if (!roleID) throw new NotFoundException('Rol no registrado');
    return res.status(HttpStatus.OK).json({
      message: 'Rol eliminado satisfactoriamente',
      roleDeleted,
    });
  }

  @Put('/update/:roleID')
  async updateProject(
    @Res() res,
    @Body() createRoleDTO: CreateteRoleDTO,
    @Param('roleID') roleID,
  ) {
    const roleUpdated = await this.rolesService.updaterole(
      roleID,
      createRoleDTO,
    );

    if (!roleUpdated) throw new NotFoundException('Rol no registrado');
    return res.status(HttpStatus.OK).json({
      message: 'Rol actualizado satisfactoriamente',
      roleUpdated,
    });
  }
}
