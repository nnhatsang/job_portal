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
  async getAllCities(@Query('kw') kw?: string) {
    try {
      const cities = await this.cityService.getAll(kw);
      return { cities };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get(':id')
  async getCityById(@Param('id') id: string) {
    try {
      const city = await this.cityService.getCityId(id);
      return { city };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get(':id/companies')
  @ApiQuery({ name: 'kw', required: false })
  async getCompaniesByCity(@Param('id') id: string, @Query('kw') kw?: string) {
    try {
      const companies = await this.cityService.getCompaniesByCity(id, kw);
      return { companies };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get(':id/jobs')
  @ApiQuery({ name: 'kw', required: false })
  async getJobsByCity(@Param('id') id: string, @Query('kw') kw?: string) {
    try {
      const jobs = await this.cityService.getJobCityId(id, kw);
      return { jobs };
    } catch (error) {
      return { error: error.message };
    }
  }
}
