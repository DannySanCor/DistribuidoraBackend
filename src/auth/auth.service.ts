import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user: any = await this.usersService.findOne(username);

    console.log(user);

    const validation = await compare(pass, user.password);
    console.log(validation);
    if (user && validation) {
      const { password, ...result } = user;

      return result;
    } else throw new NotFoundException('Contraseña Incorrecta');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
