// src/posts/posts.controller.ts

import { Controller, Get, Query, Res, HttpStatus, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Response } from 'express';

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
}
