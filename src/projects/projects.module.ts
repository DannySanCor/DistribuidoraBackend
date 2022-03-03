import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { projectSchema } from './schemas/project.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Project',
        schema: projectSchema,
      },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
