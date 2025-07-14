import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserId } from 'src/auth/decorator/user-id.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: '포스트 생성' })
  @Post()
  create(@Body() createPostDto: CreatePostDto, @UserId() userId: number) {
    return this.postService.create(createPostDto, userId);
  }

  @ApiOperation({
    summary:
      '내 포스트 조회 (title 검색, level 필터링, category_id 필터링 가능)',
  })
  @Get('')
  findAll(@Query() getPostDto: GetPostDto, @UserId() userId: number) {
    return this.postService.findAll(getPostDto, userId);
  }

  @ApiOperation({ summary: '내 포스트 상세 조회' })
  @Get(':id')
  findOne(@Param('id') id: string, @UserId() userId: number) {
    return this.postService.findOne(+id, userId);
  }

  @ApiOperation({ summary: '내 포스트 수정' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UserId() userId: number,
  ) {
    return this.postService.update(+id, updatePostDto, userId);
  }

  @ApiOperation({ summary: '내 포스트의 질문 답변 수정' })
  @Patch('/question/:id')
  updateQuestionAnswer(
    @Param('id') id: string,
    @Body() questionAnswer: string,
    @UserId() userId: number,
  ) {
    return this.postService.updateQuestionAnswer(+id, questionAnswer, userId);
  }

  @ApiOperation({ summary: '내 포스트 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string, @UserId() userId: number) {
    return this.postService.remove(+id, userId);
  }
}
