import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { User } from "./users/users.model";
import { Post } from "./posts/posts.model";
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),

    TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "pet_db",
    synchronize: true,
    logging: false,
    entities: [User, Post, Role],
  }),
    UsersModule,
    PostsModule,
    RolesModule,
    AuthModule,
    FilesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
