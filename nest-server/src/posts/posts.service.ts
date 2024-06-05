// src/posts/posts.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { UpdatePostDto } from 'src/dto/posts/update-post.dto';

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
    const queryBuilder = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comment')
      .orderBy(`post.${orderBy}`, 'ASC')
      .offset(offset)
      .limit(limit);

    if (search) {
      queryBuilder.where(
        'post.title LIKE :search OR post.content LIKE :search',
        { search: `%${search}%` },
      );
    }

    const posts = await queryBuilder.getMany();

    posts.forEach((post) => {
      post.comments = post.comments.slice(0, 3);
    });

    return posts;
  }

  async list(orderBy: string, search?: string): Promise<Post[]> {
    console.log('list');
    // const queryBuilder = this.postsRepository
    //   .createQueryBuilder('post')
    //   .leftJoinAndSelect('comments', 'comment')
    //   .orderBy(`post.${orderBy}`, 'ASC');

    // if (search) {
    //   queryBuilder.where(
    //     'post.title LIKE :search OR post.content LIKE :search',
    //     { search: `%${search}%` },
    //   );
    // }

    // const posts = await queryBuilder.getMany();

    const posts = await this.postsRepository.find({ relations: ['comments'] });

    // posts.forEach((post) => {
    //   post.comments = post.comments.slice(0, 3);
    // });

    return posts;
  }
  //get post by id
  async findOne(id: string): Promise<Post> {
    return this.postsRepository.findOneBy({ id });
  }
  //create post
  async create(user_id: string, title: string, content: string): Promise<Post> {
    const post = this.postsRepository.create({
      title,
      content,
      user_id,
    });

    return this.postsRepository.save(post);
  }

  //update post

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postsRepository.findOneBy({ id });
    Object.assign(post, updatePostDto);
    return await this.postsRepository.save(post);
  }

  //delete post
  async destroy(id: string): Promise<Post | null> {
    const post = await this.postsRepository.findOneBy({ id });
    await this.postsRepository.remove(post);
    return post;
  }

  //archive
  async archive(id: string): Promise<Post | null> {
    const post = await this.postsRepository.findOneBy({ id });
    post.deleted_at = new Date();
    return await this.postsRepository.save(post);
  }

  async unarchive(id: string): Promise<Post | null> {
    const post = await this.postsRepository.findOneBy({ id });
    post.deleted_at = null;
    return await this.postsRepository.save(post);
  }
}
