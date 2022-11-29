import { Body, Controller, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {
  }

  @Post('/:id')
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Param('id', ParseIntPipe) id: number,
             @Body() dto: CreatePostDto,
             @UploadedFile() image
  ) {
    return this.postService.create(id, dto, image);
  }
}
