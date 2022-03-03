import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from 'src/auth/custom-decorator';
import { CreateProjectDTO } from './dto/project.dto';
import { ProjectsService } from './projects.service';
@Controller('projects')
@ApiTags('Proyectos')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Not Authorize' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}
  @Post('/create')
  async createProject(@Res() res, @Body() createProjectDTO: CreateProjectDTO) {
    createProjectDTO.tagActive = 1;
    createProjectDTO.tagDelete = 0;
    const project = await this.projectsService.createProject(createProjectDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Nuevo proyecto registrado satisfactoriamente',
      proyecto: project,
    });
  }
  //Con decorador Public no hay necesidad de generar token
  @Public()
  @Get('/')
  async getProjects(@Res() res) {
    const projects = await this.projectsService.getProjects();
    return res.status(HttpStatus.OK).json({
      message: 'Proyectos registrados',
      projects,
    });
  }

  @Get('/:projectID')
  async getProject(@Res() res, @Param('projectID') projectID) {
    const project = await this.projectsService.getProject(projectID);
    if (!project) throw new NotFoundException('Proyecto no registrado');
    return res.status(HttpStatus.OK).json(project);
  }

  @Delete('/delete')
  async deleteProject(@Res() res, @Query('projectID') projectID) {
    const projectDeleted = await this.projectsService.deleteProject(projectID);
    if (!projectID) throw new NotFoundException('Proyecto no registrado');
    return res.status(HttpStatus.OK).json({
      message: 'Proyecto eliminado satisfactoriamente',
      projectDeleted,
    });
  }

  @Put('/update/:projectID')
  async updateProject(
    @Res() res,
    @Body() createProjectDTO: CreateProjectDTO,
    @Param('projectID') projectID,
  ) {
    const projectUpdated = await this.projectsService.updateProject(
      projectID,
      createProjectDTO,
    );

    if (!projectUpdated) throw new NotFoundException('Proyecto no registrado');
    return res.status(HttpStatus.OK).json({
      message: 'Proyecto actualizado satisfactoriamente',
      projectUpdated,
    });
  }
}
