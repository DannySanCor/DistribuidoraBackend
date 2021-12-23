import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { initSwagger } from "./app.swagger";
import mongoose from 'mongoose';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwagger(app);
  await mongoose.connect('mongodb://localhost/distribuidora-nest');
  await app.listen(3000);
 
  

}
bootstrap();
