import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { roleSchema } from './schemas/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Role',
        schema: roleSchema,
      },
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
