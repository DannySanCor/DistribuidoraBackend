import { Module } from '@nestjs/common';

import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { SociosModule } from './socios/socios.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { urlConfig } from './config/configuration';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    SociosModule,
    UsersModule,
    ProjectsModule,
    RolesModule,
    MongooseModule.forRoot(urlConfig, {
      useNewUrlParser: true,
    }),
    AuthModule,
    OrdersModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
