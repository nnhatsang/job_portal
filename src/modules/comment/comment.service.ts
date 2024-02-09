import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CommentService {
  prisma = new PrismaClient();
  async addComment(
    userId: number,
    company_id: number,
    commentData: { rating: number; assessment: string },
  ) {
    const result = await this.prisma.comment.create({
      data: {
        Candidate_ID: userId,
        Company_ID: company_id,
        Rating: commentData.rating,
        Assessment: commentData.assessment,
        CreatedDate: new Date(),
      },
    });

    return result;
  }
}
