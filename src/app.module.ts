import { Module } from '@nestjs/common';

import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { SociosModule } from './socios/socios.module';
import { AppController } from './app.controller';
import { SociosService } from './socios/socios.service';

@Module({
  imports: [SociosModule,
    MongooseModule.forRoot('mongodb://localhost/distribuidora-nest',
    {
      useNewUrlParser:true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
