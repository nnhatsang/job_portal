import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('application')
@ApiTags('candidate_job')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createAppli(
    @Req() request,
    @Body(new ValidationPipe()) data: { Job_ID: string; CV_ID: string },
  ) {
    const candidateID = request.user.candidateInfo.candidateID;
    const Job_ID = parseInt(data.Job_ID, 10);
    const CV_ID = parseInt(data.CV_ID, 10);
    const result = await this.applicationService.addApplication(
      candidateID,
      Job_ID,
      CV_ID,
    );
    return result;
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateApplication(
    @Req() request,
    @Param('id') candidateJobId: string,
    @Body() updatedData: { Job_ID: string; CV_ID: string },
  ) {
    const candidateID = request.user.candidateInfo.candidateID;
    const jobId = parseInt(updatedData.Job_ID, 10);
    const cvId = parseInt(updatedData.CV_ID, 10);
    const result = await this.applicationService.updateApplication(
      parseInt(candidateJobId, 10),
      candidateID,
      { Job_ID: jobId, CV_ID: cvId },
    );

    return result;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteApplication(@Req() request, @Param('id') candidateJobId: string) {
    const candidateID = request.user.candidateInfo.candidateID;

    const result = await this.applicationService.deleteApplication(
      parseInt(candidateJobId, 10),
      candidateID,
    );

    return result;
  }
}
