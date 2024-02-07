import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { job } from '@prisma/client';
@ApiTags('job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  @ApiQuery({ name: 'kw', required: false })
  getAll(@Query('kw') kw?: string): Promise<job[]> {
    return this.jobService.getAll(kw);
  }

  @Get(':id')
  getCompanyId(@Param('id') id: string) {
    return this.jobService.getId(id);
  }
}
