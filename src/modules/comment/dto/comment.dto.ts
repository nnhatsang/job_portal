// src/modules/comment/dto/comment.dto.ts

import { IsInt, Min, Max, IsString, Length } from 'class-validator';

export class AddCommentDto {
  @IsInt()
  @Min(1)
  company_id: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @Length(1, 300)
  assessment: string;
}
