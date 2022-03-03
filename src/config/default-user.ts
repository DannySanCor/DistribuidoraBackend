import { UsersService } from '../users/users.service';
import { UsersController } from '../users/users.controller';
import { User } from '../users/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import {
  DEFAULT_USERNAME,
  DEFAULT_FIRSTNAME,
  DEFAULT_LASTNAME,
  DEFAULT_USER_EMAIL,
  DEFAULT_USER_PASSWORD,
  DEFAULT_USER_ROL,
} from './constants';
import { CreateUserDTO } from '../users/dto/user.dto';
import { hash } from 'bcrypt';

export const setDefaultUser = async (
  config: ConfigService,
  usersService: UsersService,
  createUserDTO: CreateUserDTO,
) => {
  let userDefault = null;
  try {
    userDefault = await usersService.findOnebyEmail(
      config.get<string>('DEFAULT_USER_EMAIL'),
    );
    console.log('Ya existe Usuario de Arranque');
  } catch {
    console.log(userDefault);
    if (!userDefault) {
      createUserDTO.userName = config.get<string>('DEFAULT_USERNAME');
      createUserDTO.firstName = config.get<string>('DEFAULT_FIRSTNAME');
      createUserDTO.lastName = config.get<string>('DEFAULT_LASTNAME');
      createUserDTO.emailUser = config.get<string>('DEFAULT_USER_EMAIL');
      const password: string = createUserDTO.password.toString();
      const saltOrRounds = 10;
      createUserDTO.password = await hash(password, saltOrRounds);
      createUserDTO.rol = config.get<number>('DEFAULT_USER_ROL');
      const adminUser = await usersService.createUser(createUserDTO);
      return adminUser;
    }
  }
};
