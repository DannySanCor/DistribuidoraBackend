import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './interface/project.interface';
import { CreateProjectDTO } from './dto/project.dto';
@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project') private readonly projectModel: Model<Project>,
  ) {}

  async getProjects(): Promise<Project[]> {
    const projects = await this.projectModel.find();
    return projects;
  }
  async getProject(projectID?: string): Promise<Project> {
    const project = await this.projectModel.findById(projectID);
    return project;
  }
  async createProject(createProjectDTO: CreateProjectDTO): Promise<Project> {
    const project = new this.projectModel(createProjectDTO);
    return await project.save();
  }
  async deleteProject(projectID: string): Promise<Project> {
    const deletedProject = await this.projectModel.findByIdAndDelete(projectID);
    return deletedProject;
  }
  async updateProject(
    projectID: string,
    createProjectDTO: CreateProjectDTO,
  ): Promise<Project> {
    const updateProject = await this.projectModel.findByIdAndUpdate(
      projectID,
      createProjectDTO,
      { new: true },
    );
    return updateProject;
  }
}
