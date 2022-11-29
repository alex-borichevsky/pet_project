import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./posts.model";
import { User } from "../users/users.model";
import { FilesService } from "../files/files.service";
import { FilesModule } from "../files/files.module";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    FilesModule,
    UsersModule,
    TypeOrmModule.forFeature([Post, User])
  ]
})
export class PostsModule {}
