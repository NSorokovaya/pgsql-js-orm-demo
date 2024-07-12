// src/posts/posts.controller.ts

import {
  Controller,
  Get,
  Query,
  HttpStatus,
  Param,
  Post,
  Body,
  HttpException,
  Patch,
  NotFoundException,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from 'src/dto/posts/create-post.dto';
import { UpdatePostDto } from 'src/dto/posts/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // get all posts
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  async list(@Query() query) {
    const validOrderByFields = ['created_at', 'title'];
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const orderBy = validOrderByFields.includes(query.orderBy as string)
      ? (query.orderBy as string)
      : 'created_at';
    let posts = [];

    if (query.page && query.limit) {
      posts = await this.postsService.listPage(
        limit,
        offset,
        orderBy,
        query.search as string,
      );
    } else {
      posts = await this.postsService.list(orderBy, query.search as string);
    }
    return { data: posts };
  }

  //get posts by id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new HttpException(
        { error: 'Post is not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return { data: post };
  }
  // create post
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const { title, content, user_id } = createPostDto;
    const post = await this.postsService.create(user_id, title, content);
    return { data: post };
  }

  //update post
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    if (!Object.keys(updatePostDto).length) {
      throw new HttpException(
        { error: 'Please provide fields to update' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedPost = await this.postsService.update(id, updatePostDto);
    return { data: updatedPost };
  }

  //delete
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async destroy(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new HttpException(
        { error: 'Post is not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.postsService.destroy(id);
    return { data: 'Post removed', result };
  }
  //archive
  @UseGuards(JwtAuthGuard)
  @Delete(':id/archive')
  async archive(@Param('id') id: string) {
    const result = await this.postsService.archive(id);
    if (!result) {
      throw new NotFoundException(`Post with id was not found`);
    }
    return { data: 'Post archieved', result };
  }

  //unarchive
  @UseGuards(JwtAuthGuard)
  @Put(':id/unarchive')
  async unarchive(@Param('id') id: string) {
    const result = await this.postsService.unarchive(id);
    if (!result) {
      throw new NotFoundException(`Post with id was not found`);
    }
    return { data: 'Post unarchieved', result };
  }
}
