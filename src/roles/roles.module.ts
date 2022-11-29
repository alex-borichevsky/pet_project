import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./roles.model";
import { User } from "../users/users.model";

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  exports: [
    RolesService
  ],
  imports: [
    TypeOrmModule.forFeature([Role, User])
  ]
})
export class RolesModule {}
