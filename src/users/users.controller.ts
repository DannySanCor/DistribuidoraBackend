import { hash } from 'bcrypt';
import { UsersService } from './users.service';
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
import { CreateUserDTO } from './dto/user.dto';
import { Public } from 'src/auth/custom-decorator';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Not Authorize' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/create')
  async createUser(@Res() res, @Body() CreateUserDTO: CreateUserDTO) {
    //const lastUser: any = await this.getLastUser();
    await this.getLastUser();
    const saltOrRounds = 10;
    const password: string = CreateUserDTO.password.toString();
    //const hashPass = await hash(password, saltOrRounds);
    await hash(password, saltOrRounds);

    CreateUserDTO.tagActive = 1;
    CreateUserDTO.tagDelete = 0;

    const user: any = await this.userService.createUser(CreateUserDTO);
    console.log('recibido de service');
    console.log(user);
    if (!user.code) {
      return res.status(HttpStatus.OK).json({
        message: 'Nuevo Usuario Registrado Satisfactoriamente',
        user: user,
      });
    } else if (user.code === 11000) {
      return res.status(HttpStatus.OK).json({
        message:
          'Ya hay un usuario registrado con ese email, intenta con otro por favor!',
        email: user.keyValue.emailUser,
        errorCode: user.code,
      });
    }
  }
  //Con decorador Public no hay necesidad de generar token
  @Public()
  @Get('/')
  @ApiTags()
  async getUsers(@Res() res) {
    const users = await this.userService.getUsers();
    return res.status(HttpStatus.OK).json({
      message: 'Usuarios Registrados',
      users,
    });
  }
  @Public()
  @Get('/lastUser')
  async getLastUser() {
    const Lastuser = await this.userService.getLastUser();
    return Lastuser;
  }

  @Get('/:userId')
  async getUser(@Res() res, @Param('userId') userId) {
    /*var ObjectId = require('mongoose').ValidationPipe.ObjectId;
    if( !ObjectId.isValid(userId) )
    return false;*/
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      // it's an ObjectID
      const user: any = await this.userService.getUser(userId);
      if (!user) throw new NotFoundException('Usuario no registrado');
      return res.status(HttpStatus.OK).json(user);
    } else {
      const mensaje = {
        message: 'Id Invalido',
      };
      return res.status(HttpStatus.OK).json(mensaje);
    }
  }

  @Delete('/delete')
  async deleteUser(@Res() res, @Query('userId') userId) {
    const userDeleted = await this.userService.deleteUser(userId);
    if (!userId) throw new NotFoundException('Usuario no registrado');
    return res.status(HttpStatus.OK).json({
      message: 'Usuario Eliminado Satisfactoriamente',
      userDeleted,
    });
  }

  @Put('/update')
  async updateUser(
    @Res() res,
    @Body() createUserDTO: CreateUserDTO,
    @Query('userId') userId,
  ) {
    console.log('Entró a controller');
    const password: string = createUserDTO.password.toString();
    const saltOrRounds = 10;
    createUserDTO.password = await hash(password, saltOrRounds);
    console.log(createUserDTO.password);
    const userUpdated = await this.userService.updateUser(
      userId,
      createUserDTO,
    );

    if (!userUpdated) throw new NotFoundException('Usuario no registrado');
    return res.status(HttpStatus.OK).json({
      message: 'Usuario Actualizado Satisfactoriamente',
      userUpdated,
    });
  }
}
