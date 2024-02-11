import { Injectable, Param } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaClient, company } from '@prisma/client';

@Injectable()
export class CompanyService {
  prisma = new PrismaClient();

  getAll(kw?: string): Promise<company[]> {
    // Check if kw is provided and handle it accordingly
    if (kw) {
      // Implement logic with kw
      return this.prisma.company.findMany({
        where: {
          OR: [
            { Name: { contains: kw } },
            { city: { CityName: { contains: kw } } },
          ],
          Ischecked: true, // Thêm điều kiện kiểm tra IsChecked
          IsDeleted: false,
        },
        include: {
          city: true,
        },
      });
    }

    return this.prisma.company.findMany({
      where: {
        Ischecked: true, // Thêm điều kiện kiểm tra IsChecked
        IsDeleted: false,
      },
      include: {
        city: true,
      },
    });
  }

  getJobs(id: number, kw: string) {
      const currentDate = new Date();

    // Sử dụng Prisma để truy vấn cơ sở dữ liệu
    const companyId = parseInt(id.toString(), 10);

    // Sử dụng Prisma để truy vấn cơ sở dữ liệu
    const jobs = this.prisma.job.findMany({
      where: {
        Company_ID: companyId,
        IsDeleted: false,
        Name: {
          contains: kw,
        },
        IsChecked: true,
        EndDate: {
          gte: currentDate, // gte: greater than or equal to
        },
      },
    });

    return jobs; // Make sure to return the result of the query
  }

  getCompanyId(@Param('id') id: string) {
    return this.prisma.company.findUnique({
      where: {
        ID: parseInt(id, 10),
        Ischecked: true,
        IsDeleted: false, 
      },
      include: {
        city: true,
      },
    });
  }

  getComments(id: string) {
    return this.prisma.comment.findMany({
      where: { Company_ID: parseInt(id, 10) },
    });
  }
}
