import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  findAll(dto: GetPostDto) {
    const { title, categoryId } = dto;

    if (title) {
      return this.postRepository.find({
        where: { title: ILike(`%${title}%`) },
        relations: ['category'],
      });
    }

    if (categoryId) {
      return this.postRepository.find({
        where: { category: { id: categoryId } },
        relations: ['category'],
      });
    }

    return this.postRepository.find();
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!post) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);

    if (!post) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }

    await this.postRepository.update(id, { ...updatePostDto });

    const newPost = await this.postRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    return newPost;
  }

  async remove(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }

    await this.postRepository.remove(post);

    return id;
  }
}
