import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CurriculumVitaeService } from './curriculum-vitae.service';
import { CreateCurriculumVitaeDto } from './dto/create-cv.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@Controller('curriculum-vitae')
@ApiTags('cvs')
export class CurriculumVitaeController {
  constructor(
    private readonly curriculumVitaeService: CurriculumVitaeService,
  ) {}

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  async createCurriculumVitae(
    @Req() req,
    // @Param('candidateId') candidateId: string,
    @Body(new ValidationPipe())
    createCurriculumVitaeDto: CreateCurriculumVitaeDto,
  ) {
    try {
      console.log('Before calling createCurriculumVitae');

      const candidateId = req.user.candidateInfo.candidateID;
      console.log(candidateId);
      // try {
      const result = await this.curriculumVitaeService.createCurriculumVitae(
        parseInt(candidateId, 10),
        createCurriculumVitaeDto,
      );

      return {
        message: 'Curriculum Vitae created successfully',
        statusCode: 201,
        content: result,
        data: createCurriculumVitaeDto,
      };
    } catch (error) {
      throw new NotFoundException('Candidate not found');
    }
  }
}
