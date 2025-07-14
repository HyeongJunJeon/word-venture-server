import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entity/post.entity';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    const { category_id, ...postData } = createPostDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    const post = this.postRepository.create({
      ...postData,
      category: { id: category_id },
      user: { id: userId },
    });

    return this.postRepository.save(post);
  }

  findAll(dto: GetPostDto, userId: number) {
    const { title, category_id, level } = dto;
    const baseWhere = { user: { id: userId } };

    if (title) {
      return this.postRepository.find({
        where: { ...baseWhere, title: ILike(`%${title}%`) },
        relations: ['category', 'user'],
      });
    }

    if (category_id) {
      return this.postRepository.find({
        where: { ...baseWhere, category: { id: category_id } },
        relations: ['category', 'user'],
      });
    }

    if (level) {
      return this.postRepository.find({
        where: { ...baseWhere, level },
        relations: ['category', 'user'],
      });
    }

    return this.postRepository.find({
      where: baseWhere,
      relations: ['category', 'user'],
    });
  }

  async findOne(id: number, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['category', 'user'],
    });

    if (!post) {
      throw new NotFoundException('포스트를 찾을 수 없거나 권한이 없습니다.');
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException('포스트를 찾을 수 없거나 권한이 없습니다.');
    }

    const { category_id, ...postData } = updatePostDto;

    const updateData = {
      ...postData,
      ...(category_id && { category: { id: category_id } }),
    };

    await this.postRepository.update(id, updateData);

    const newPost = await this.postRepository.findOne({
      where: { id },
      relations: ['category', 'user'],
    });

    return newPost;
  }

  async updateQuestionAnswer(
    id: number,
    questionAnswer: string,
    userId: number,
  ) {
    const post = await this.postRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });

    if (!post) {
      throw new NotFoundException('포스트를 찾을 수 없거나 권한이 없습니다.');
    }

    await this.postRepository.update(id, {
      questions: {
        ...post.questions,
        answer: questionAnswer,
      },
    });

    return this.findOne(id, userId);
  }

  async remove(id: number, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!post) {
      throw new NotFoundException('포스트를 찾을 수 없거나 권한이 없습니다.');
    }

    await this.postRepository.remove(post);

    return id;
  }
}
