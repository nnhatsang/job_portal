import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { company } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiQuery({ name: 'kw', required: false })
  async getCompanies(@Query('kw') kw?: string): Promise<company[]> {
    return this.companyService.getCompanies(kw);
  }

  @Get(':id/jobs')
  @ApiQuery({ name: 'kw', required: false })
  getJobs(@Param('id') id: number, @Query('kw') kw: string) {
    return this.companyService.getJobs(id, kw);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Get(':id/comments')
  getComments(@Param('id') id: string) {
    return this.companyService.getComments(id);
  }
}
