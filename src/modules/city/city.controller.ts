import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PrismaClient, city } from '@prisma/client';
@ApiTags('city')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  prisma = new PrismaClient();
  @Get()
  @ApiQuery({ name: 'kw', required: false })
  getAll(@Query('kw') kw?: string): Promise<city[]> {
    return this.cityService.getAll(kw);
  }

  @Get(':id')
  getCityId(@Param('id') id) {
    return this.cityService.getCityId(id);
  }

  @Get(':id/company')
  @ApiQuery({ name: 'kw', required: false })
  getCompanyCityId(@Param('id') id: string, @Query('kw') kw: string) {
    return this.cityService.getCompaniesByCity(id, kw);
  }
  @Get(':id/jobs')
  @ApiQuery({ name: 'kw', required: false })
  getJobCityId(@Param('id') id: string, @Query('kw') kw: string) {
    return this.cityService.getJobCityId(id, kw);
  }
}
