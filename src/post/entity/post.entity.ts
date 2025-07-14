import { Expose } from 'class-transformer';
import { Category } from 'src/category/entity/category.entity';
import { BaseTable } from 'src/common/entity/base-table.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Level, Question, Word } from '../type/post.type';
import { User } from 'src/user/entity/user.entity';

@Entity()
export class Post extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  get postCreatedAt(): Date {
    return this.createdAt;
  }

  @Column({ enum: Level, default: Level.level1 })
  level: Level;

  @Column()
  title: string;

  @Column({ type: 'jsonb' })
  today_words: Word[];

  @Column({ type: 'jsonb' })
  learned_words: Word[];

  @Column()
  grammars_textArea: string;

  @Column({ type: 'jsonb' })
  questions: Question;

  @ManyToOne(() => Category, (category) => category.posts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => User, (user) => user.createdPosts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
