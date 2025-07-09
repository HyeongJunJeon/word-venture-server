import { BaseTable } from 'src/common/entity/base-table.entity';
import { Post } from 'src/post/entity/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
