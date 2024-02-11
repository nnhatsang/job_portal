import { Injectable } from '@nestjs/common';
import { CreateCurriculumVitaeDto } from './dto/create-cv.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CurriculumVitaeService {
  prisma = new PrismaClient();
  async createCurriculumVitae(
    candidateId: number,
    cvData: CreateCurriculumVitaeDto,
  ) {
    const createdCv = await this.prisma.curriculum_vitae.create({
      data: {
        Candidate_ID: candidateId,
        Is_Deleted: false,
        CareerGoals: cvData.CareerGoals,
        DegreeDetail: cvData.DegreeDetail,
        ExperienceDetail: cvData.ExperienceDetail,
      },
    });

    return createdCv;
  }
}
