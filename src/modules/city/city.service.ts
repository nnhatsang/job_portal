import { Injectable, Param } from '@nestjs/common';
import { PrismaClient, city, company } from '@prisma/client';

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

  getCityId(@Param('id') id) {
    return this.prisma.city.findUnique({
      where: { ID: parseInt(id, 10) },
    });
  }
  getCompaniesByCity(id:string, kw: string): Promise<company[]> {
    // Sử dụng Prisma để truy vấn cơ sở dữ liệu
    const companies = this.prisma.company.findMany({
      where: {
        City_ID: parseInt(id, 10),
        Ischecked: true,
        IsDeleted: false,
        Name: {
          contains: kw,
        },
      },
    });

    return companies;
  }
}
