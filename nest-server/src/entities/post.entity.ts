import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Comment } from './comment.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  user_id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;

  @OneToMany(() => Comment, (comment) => comment.post)
  @JoinColumn({ name: 'id', referencedColumnName: 'post_id' })
  comments: Comment[];
}
