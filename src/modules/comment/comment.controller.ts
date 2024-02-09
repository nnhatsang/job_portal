import { Body, Controller, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AddCommentDto } from './dto/comment.dto';

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post('')
  @UseGuards(AuthGuard('jwt'))
  async addComment(
    @Req() request,
    @Body(new ValidationPipe()) commentData: AddCommentDto,
  ) {
    const userId = request.user.candidateInfo.candidateID;
    const { company_id, rating, assessment } = commentData;

    // Process the validated commentData
    const result = await this.commentService.addComment(userId, company_id, {
      rating,
      assessment,
    });

    return result;
  }
}
