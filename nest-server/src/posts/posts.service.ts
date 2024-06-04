// src/posts/posts.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async listPage(
    limit: number,
    offset: number,
    orderBy: string,
    search?: string,
  ): Promise<Post[]> {
    const queryBuilder = this.postsRepository.createQueryBuilder('post');

    if (search) {
      queryBuilder.where(
        'post.title LIKE :search OR post.content LIKE :search',
        { search: `%${search}%` },
      );
    }

    return queryBuilder
      .orderBy(`post.${orderBy}`, 'ASC')
      .offset(offset)
      .limit(limit)
      .getMany();
  }

  async list(orderBy: string, search?: string): Promise<Post[]> {
    const queryBuilder = this.postsRepository.createQueryBuilder('post');

    if (search) {
      queryBuilder.where(
        'post.title LIKE :search OR post.content LIKE :search',
        { search: `%${search}%` },
      );
    }

    return queryBuilder.orderBy(`post.${orderBy}`, 'ASC').getMany();
  }

  async findOne(id: string): Promise<Post> {
    return this.postsRepository.findOneBy({ id });
  }
}
