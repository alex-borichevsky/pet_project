import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesModule } from "../roles/roles.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.model";
import { Post } from "../posts/posts.model";
import { Role } from "../roles/roles.model";
import { AuthModule } from "../auth/auth.module";


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    RolesModule,
    TypeOrmModule.forFeature([User, Post, Role]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
