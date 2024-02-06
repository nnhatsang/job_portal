import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { PrismaClient, company } from '@prisma/client';
@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @ApiQuery({ name: 'kw', required: false })
  getAll(@Query('kw') kw?: string): Promise<company[]> {
    return this.companyService.getAll(kw);
  }

  @Get(':id/jobs')
  @ApiQuery({ name: 'kw', required: false })
  getJobs(@Param('id') id: number, @Query('kw') kw: string) {
    return this.companyService.getJobs(id, kw);
  }

  @Get(':id')
  getCompanyId(@Param('id') id: string) {
    return this.companyService.getCompanyId(id);
  }

  @Get(':id/comments')
  getComments(@Param('id') id: string) {
    return this.companyService.getComments(id);
  }
}
