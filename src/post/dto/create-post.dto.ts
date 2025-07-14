import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Level, Question, Word } from '../type/post.type';

export class WordDto implements Word {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  original_text: string;

  @IsNotEmpty()
  @IsString()
  meaning: string;
}

export class QuestionDto implements Question {
  @IsNotEmpty()
  @IsString()
  original_text: string;

  @IsNotEmpty()
  @IsString()
  korean: string;

  @IsOptional()
  @IsString()
  answer?: string;
}

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WordDto)
  today_words: WordDto[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WordDto)
  learned_words: WordDto[];

  @IsNotEmpty()
  @IsString()
  grammars_textArea: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => QuestionDto)
  questions: QuestionDto;

  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
