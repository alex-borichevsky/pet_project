import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.model";
import { Repository } from "typeorm";
import { AddRoleParams, BanUserParams, CreateUserParams, UpdateUserParams } from "../utils/types";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
              private roleService: RolesService) {
  }
  public async getUserByEmail(email: string) {
    return this.userRepository.findOne( {where: [{email}], relations: ['posts', 'roles']});
  }
  public async fetchUsers() {
    return await this.userRepository.find({ relations: ['posts', 'roles'] });
  }

  public async createUser(createUserDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...createUserDetails, createdAt: new Date()
    });
    const role = await this.roleService.getRole("ADMIN");
    newUser.roles = [role];
    return this.userRepository.save(newUser);
  }

  public updateUser(updateId: number, userDetails: UpdateUserParams) {
    return this.userRepository.update(updateId, { ...userDetails });
  }

  public delete(id: number) {
    return this.userRepository.delete(id);
  }

  public async getUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  public async addRole(dto: AddRoleParams) {
    const id = dto.userId;
    const user = await this.userRepository.findOneBy({id});
    const role = await this.roleService.getRole(dto.value);
    if(user && role) {
          user.roles.push(role);
          return await this.userRepository.save(user);

    }
    throw new HttpException("User or Role not found", HttpStatus.NOT_FOUND);
  }
  public async banUser(banDetails: BanUserParams) {
    const id = banDetails.userId;
    const user = await this.userRepository.findOneBy({id});
    user.banned = true;
    return this.userRepository.save(user);
  }
}