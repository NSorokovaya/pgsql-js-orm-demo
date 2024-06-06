import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { APP_PIPE } from '@nestjs/core';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5433,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'postgres',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: false,
      logging: true,
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [CommentsController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    CommentsService,
  ],
})
export class AppModule {}
