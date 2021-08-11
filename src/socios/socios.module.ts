import { Module } from '@nestjs/common';
import { SociosController } from './socios.controller';
import { SociosService } from './socios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SocioSchema } from "./schemas/socio.schema";
@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {
          name: 'Socio',
          schema:SocioSchema
        }
      ]
    )

  ],
  controllers: [SociosController],
  providers: [SociosService]
})
export class SociosModule 
{ 
  
}
