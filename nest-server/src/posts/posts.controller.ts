// src/posts/posts.controller.ts

import {
  Controller,
  Get,
  Query,
  Res,
  HttpStatus,
  Param,
  Post,
  Req,
  Body,
  HttpException,
  Patch,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Response } from 'express';
import { CreatePostDto } from 'src/entities/dto/posts/create-post.dto';
import { UpdatePostDto } from 'src/entities/dto/posts/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  // get all posts
  @Get()
  async list(@Query() query, @Res() res: Response) {
    try {
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

      return res.status(HttpStatus.OK).json({ data: posts });
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }

  //get posts by id
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const post = await this.postsService.findOne(id);
      if (!post) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: 'Post is not found' });
      }
      return res.status(HttpStatus.OK).json({ data: post });
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal Server Error' });
    }
  }
  // create post
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const { title, content, user_id } = createPostDto;
    if (!title || !content || !user_id) {
      throw new HttpException(
        { error: 'Missing required fields' },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const post = await this.postsService.create(user_id, title, content);
      return { data: post };
    } catch (error) {
      console.error('Error creating post:', error);
      throw new HttpException(
        { error: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //update post
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    if (!Object.keys(updatePostDto).length) {
      throw new HttpException(
        { error: 'Please provide fields to update' },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const updatedPost = await this.postsService.update(id, updatePostDto);
      return { data: updatedPost };
    } catch (error) {
      console.error('Error updating post:', error);
      throw new HttpException(
        { error: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
