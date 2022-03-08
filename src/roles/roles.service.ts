import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './interfaces/role.interface';
import { CreateteRoleDTO } from './dto/role.dto';
@Injectable()
export class RolesService {
  constructor(@InjectModel('Role') private readonly rolModel: Model<Role>) {}

  async getRoles(): Promise<Role[]> {
    const roles = await this.rolModel.find();
    return roles;
  }
  async getRole(rolID?: string): Promise<Role> {
    const role = await this.rolModel.findById(rolID);
    return role;
  }
  async createRole(CreateteRoleDTO: CreateteRoleDTO): Promise<Role> {
    const role = new this.rolModel(CreateteRoleDTO);
    return await role.save();
  }
  async deleteRole(rolID: string): Promise<Role> {
    const deletedRole = await this.rolModel.findByIdAndDelete(rolID);
    return deletedRole;
  }
  async updaterole(
    rolID: string,
    CreateteRoleDTO: CreateteRoleDTO,
  ): Promise<Role> {
    const updateRole = await this.rolModel.findByIdAndUpdate(
      rolID,
      CreateteRoleDTO,
      { new: true },
    );
    return updateRole;
  }
}
