import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./posts.model";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { CreatePostParams} from "../utils/types";
import { FilesService } from "../files/files.service";

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>,
              private userService: UsersService,
              private fileService: FilesService
              ) {
  }

  public async create(userId: number, postDetails: CreatePostParams, image: any) {
    const user = await this.userService.getUserById(userId);
    const fileName = await this.fileService.createFile(image);
    if (!user) {
      throw new HttpException("User with such id not found", HttpStatus.BAD_REQUEST);
    }
    const newPost = this.postRepository.create({
      ...postDetails,
      user,
      image: fileName
    });
    return this.postRepository.save(newPost);
  }
}
