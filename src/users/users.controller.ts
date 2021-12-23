
import { UsersService } from './users.service';
import { Controller,Get,Post,Put,Delete, Res, HttpStatus, Body, Param ,NotFoundException, Query} from '@nestjs/common';
import { CreateUserDTO } from "./dto/user.dto";
import { Public } from 'src/auth/custom-decorator';
import { ApiBearerAuth, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Not Authorize' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class UsersController {
    constructor(private userService:UsersService)
    {}
    @Post('/create')
    
 async createUser(@Res() res, @Body() CreateUserDTO: CreateUserDTO){
     
    const lastUser:any = await this.getLastUser();
    console.log(lastUser);
    
     CreateUserDTO.tagActive = 1;
     CreateUserDTO.tagDelete = 0;
     console.log(CreateUserDTO);
    const user = await this.userService.createUser(CreateUserDTO);  
    return res.status(HttpStatus.OK).json({
        message:'Nuevo Usuario Registrado Satisfactoriamente',
        user: user
    });
}
//Con decorador Public no hay necesidad de generar token
@Public()
@Get('/')
@ApiTags()
async getUsers(@Res() res)
{
    const users = await this.userService.getUsers();
   return res.status(HttpStatus.OK).json({
        message:"Usuarios Registrados",
        users
    })
}
@Public()
@Get('/lastUser')
async getLastUser()
{
    const Lastuser = await this.userService.getLastUser();
   return Lastuser;
}

@Get('/:userId')
async getUser(@Res() res, @Param('userId') userId)
{
    const user = await this.userService.getUser(userId);
    if(!user) throw new NotFoundException('Usuario no registrado')
   return res.status(HttpStatus.OK).json(user)
}

@Delete('/delete')
async deleteUser(@Res() res, @Query('userId') userId)
{
    const userDeleted = await this.userService.deleteUser(userId);
    if(!userId) throw new NotFoundException('Usuario no registrado');
    return res.status(HttpStatus.OK).json({
        message: 'Usuario Eliminado Satisfactoriamente',
        userDeleted
    }) 
}

@Put('/update')
async updateUser(@Res() res, @Body() createUserDTO:CreateUserDTO, @Query('userId') userId)
{
   const userUpdated = await this.userService.updateUser(userId,createUserDTO);

   if(!userUpdated) throw new NotFoundException('Usuario no registrado');
    return res.status(HttpStatus.OK).json({
        message: 'Usuario Actualizado Satisfactoriamente',
        userUpdated
    }) 

}
}
