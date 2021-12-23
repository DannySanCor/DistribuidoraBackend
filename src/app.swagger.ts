import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger/index";
import { INestApplication } from "@nestjs/common";

export const initSwagger = (app: INestApplication)=>
{
    const swaggerConfig = new DocumentBuilder()
    .setTitle('Distribuidora SanCor')
    .setDescription('Apis para el funcionamiento del sistema')
    .setVersion('1.0')
    .addTag('Apis')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);
}