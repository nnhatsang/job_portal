import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { PrismaClient, city, company, job } from '@prisma/client';

@Injectable()
export class CityService {
  prisma = new PrismaClient();

  getAll(kw?: string): Promise<city[]> {
    // Check if kw is provided and handle it accordingly
    if (kw) {
      // Implement logic with kw
      return this.prisma.city.findMany({
        where: {
          OR: [{ CityName: { contains: kw } }],
        },
      });
    }

    return this.prisma.city.findMany();
  }

  async getCityId(@Param('id') id) {
    const city = await this.prisma.city.findUnique({
      where: { ID: parseInt(id, 10) },
    });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    return city;
  }
  async getCompaniesByCity(id: string, kw: string): Promise<company[]> {
    // Sử dụng Prisma để truy vấn cơ sở dữ liệu
    const companies = await this.prisma.company.findMany({
      where: {
        City_ID: parseInt(id, 10),
        Ischecked: true,
        IsDeleted: false,
        Name: {
          contains: kw,
        },
      },
    });

    if (!companies.length) {
      throw new NotFoundException('Companies not found');
    }

    return companies;
  }
  async getJobCityId(id: string, kw: string): Promise<job[]> {
    // Sử dụng Prisma để truy vấn cơ sở dữ liệu
    const companies = await this.prisma.job.findMany({
      where: {
        City_ID: parseInt(id, 10),
        IsChecked: true,
        IsDeleted: false,
        Name: {
          contains: kw,
        },
      },
    });
    if (!companies.length) {
      throw new NotFoundException('Companies not found');
    }
    return companies;
  }
}
