import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
    .setTitle('Distribuidora SanCor')
    .addBearerAuth()
    .setDescription('Apis para el proyecto')
    .setVersion('1.0')
   
    
    .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document,{
        explorer:true,
        swaggerOptions:{
          filter:true,
          showRequestDuration:true,
        }
        
      });
};
