import { BaseTable } from 'src/common/entity/base-table.entity';
import { Post } from 'src/post/entity/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  kakaoId: string;

  @Column({ nullable: true })
  profileImage: string;

  @OneToMany(() => Post, (post) => post.user)
  createdPosts: Post[];
}
