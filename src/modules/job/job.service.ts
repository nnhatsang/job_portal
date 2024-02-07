import { Injectable, Param } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaClient, job } from '@prisma/client';

@Injectable()
export class JobService {
  prisma = new PrismaClient();

  getAll(kw?: string): Promise<job[]> {
    // Check if kw is provided and handle it accordingly
    if (kw) {
      // Implement logic with kw
      return this.prisma.job.findMany({
        where: {
          OR: [
            { Name: { contains: kw } },
            { Description: { contains: kw } },
            { city: { CityName: { contains: kw } } },
            { company: { Name: { contains: kw } } },
          ],
          IsChecked: true, // Thêm điều kiện kiểm tra IsChecked
          IsDeleted: false,
        },
        include: {
          city: true,
          company: true,
        },
      });
    }

    return this.prisma.job.findMany({
      where: {
        IsChecked: true, // Thêm điều kiện kiểm tra IsChecked
        IsDeleted: false,
      },
      include: {
        city: true,
        company: true,
      },
    });
  }

  getId(@Param('id') id: string) {
    return this.prisma.company.findUnique({
      where: {
        ID: parseInt(id, 10),
        Ischecked: true,
        IsDeleted: false,
      },
      include: {
        city: true,
        comment: true,
      },
    });
  }
}
