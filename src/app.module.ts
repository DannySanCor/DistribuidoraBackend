import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SociosModule } from './socios/socios.module';

@Module({
  imports: [SociosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
