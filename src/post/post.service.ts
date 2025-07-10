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

  async create(createPostDto: CreatePostDto) {
    const { category_id, ...postData } = createPostDto;

    const post = this.postRepository.create({
      ...postData,
      category: { id: category_id },
    });

    return this.postRepository.save(post);
  }

  findAll(dto: GetPostDto) {
    const { title, category_id, level } = dto;

    if (title) {
      return this.postRepository.find({
        where: { title: ILike(`%${title}%`) },
        relations: ['category'],
      });
    }

    if (category_id) {
      return this.postRepository.find({
        where: { category: { id: category_id } },
        relations: ['category'],
      });
    }

    if (level) {
      return this.postRepository.find({
        where: { level },
        relations: ['category'],
      });
    }

    return this.postRepository.find({
      relations: ['category'],
    });
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

    const { category_id, ...postData } = updatePostDto;

    const updateData = {
      ...postData,
      ...(category_id && { category: { id: category_id } }),
    };

    await this.postRepository.update(id, updateData);

    const newPost = await this.postRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    return newPost;
  }

  async updateQuestionAnswer(id: number, questionAnswer: string) {
    const post = await this.findOne(id);

    if (!post) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }

    await this.postRepository.update(id, {
      questions: {
        ...post.questions,
        answer: questionAnswer,
      },
    });

    return this.findOne(id);
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
