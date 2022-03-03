import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptors';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { initSwagger } from './app.swagger';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';
import { setDefaultUser } from './config/default-user';
import { UsersService } from './users/users.service';
import { CreateUserDTO } from './users/dto/user.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const config = app.get(ConfigService);
  const userService = app.get(UsersService);
  const createUserDTO = app.get(CreateUserDTO);
  const port = parseInt(config.get<string>(SERVER_PORT), 10) || 3000;
  const allowedOrigins = [
    'capacitor://localhost',
    'http://localhost:3000',
    'http://localhost',
    'http://localhost:4200',
  ];
  // Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Origin not allowed by CORS'));
      }
    },
  };
  initSwagger(app);
  setDefaultUser(config, userService, createUserDTO);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  /*app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true
        }
    }));*/
  app.enableCors(corsOptions);
  const server = await app.listen(port);
  server.setTimeout(1800000);
  logger.log(`Server is running at ${await app.getUrl()}`);
}
bootstrap();
