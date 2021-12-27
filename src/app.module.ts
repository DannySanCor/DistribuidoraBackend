import { Module } from '@nestjs/common';

import { AppService } from './app.service';

import {MongooseModule} from '@nestjs/mongoose'
import { SociosModule } from './socios/socios.module';
import { AppController } from './app.controller';
import { SociosService } from './socios/socios.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard} from "./auth/jwt-auth.guard"
import { UsersController } from './users/users.controller';

@Module({
  imports: [SociosModule,UsersModule,
    MongooseModule.forRoot('mongodb://localhost/distribuidora-nest',
    {
      useNewUrlParser:true,
      useUnifiedTopology: true,
      autoIndex: true,
      useCreateIndex: true,
  //ssl: false, // check for using this option in production
      connectTimeoutMS: 15000,
      poolSize: 15,
    useFindAndModify: false // <- aquí
    }),
    AuthModule,
    ],
  controllers: [AppController, UsersController],
  providers: [AppService,{provide:APP_GUARD,
    useClass: JwtAuthGuard},],
})
export class AppModule {
  
}
