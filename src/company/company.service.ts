import { Injectable, Param } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaClient } from '@prisma/client';
import { company } from '@prisma/client';
import { ApiQuery } from '@nestjs/swagger';
@Injectable()
  @ApiQuery({ name: 'kw', required: false })

export class CompanyService {
  
  prisma = new PrismaClient()

  getCompanies(kw?: string): Promise<company[]> {
    // Check if kw is provided and handle it accordingly
    if (kw) {
      // Implement logic with kw
      return this.prisma.company.findMany({
        where: {
          OR: [
            { Name: { contains: kw } },
            { city: { CityName: { contains: kw } } },
          ],
        },
        include: {
          city: true,
        },
      });
    }

    return this.prisma.company.findMany({
      include: {
        city: true,
      },
    });
  }


   getJobs(id: number, kw: string) {
    // Sử dụng Prisma để truy vấn cơ sở dữ liệu
    const companyId = parseInt(id.toString(), 10);

    // Sử dụng Prisma để truy vấn cơ sở dữ liệu
    const jobs =  this.prisma.job.findMany({
      where: {
        Company_ID: companyId,
        Name: {
          contains: kw,
        },
        IsChecked: true,
      },
    });

    return jobs; // Make sure to return the result of the query
  }

  findOne(@Param('id') id: string) {
    return this.prisma.company.findUnique({
      where: { ID: parseInt(id, 10) },
    });
  }
  getComments(id: string) {
    return this.prisma.comment.findMany({
      where: { Company_ID: parseInt(id, 10) },
    });
  }
  
}
