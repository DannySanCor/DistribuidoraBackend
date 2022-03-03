import { Controller, Request, Post, UseGuards } from '@nestjs/common';
//import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/custom-decorator';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  @ApiTags('Auth')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Not Authorize' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    const data = await this.authService.login(req.user);
    return data;
  }

  /*@UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }*/
}
