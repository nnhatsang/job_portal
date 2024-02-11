import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseData } from 'src/utils/response.utils';

@Injectable()
export class ApplicationService {
  prisma = new PrismaClient();

  async addApplication(Candidate_ID: number, Job_ID: number, CV_ID: number) {
    // Kiểm tra xem CV_ID có thuộc về Candidate_ID không
    const isCVBelongsToCandidate = await this.prisma.curriculum_vitae.findFirst(
      {
        where: {
          ID: CV_ID,
          Candidate_ID: Candidate_ID,
        },
      },
    );

    if (!isCVBelongsToCandidate) {
      return ResponseData(400, 'Invalid CV_ID khong phải của Candidate_ID', '');
    }

    // Kiểm tra xem Job_ID đã tồn tại cho Candidate_ID chưa
    const isJobExistsForCandidate = await this.prisma.candidate_job.findFirst({
      where: {
        Candidate_ID: Candidate_ID,
        Job_ID: Job_ID,
      },
    });

    if (isJobExistsForCandidate) {
      return ResponseData(400, 'Bạn đã ứng tuyển công việc này rồi', '');
    }

    // Nếu kiểm tra qua, thêm ứng tuyển
    const result = await this.prisma.candidate_job.create({
      data: {
        Candidate_ID,
        Job_ID,
        CV_ID,
        AppliedDate: new Date(),
        IsLiked: true,
      },
    });

    return ResponseData(200, 'Apply success', result);
  }
  async updateApplication(
    candidateJobId: number,
    candidateID: number,
    updatedData: { Job_ID: number; CV_ID: number },
  ) {
    try {
      // Kiểm tra xem candidate_job có tồn tại hay không
      const existingApplication = await this.prisma.candidate_job.findUnique({
        where: {
          ID: candidateJobId,
        },
      });

      // Kiểm tra xem existingApplication có tồn tại hay không
      if (!existingApplication) {
        return ResponseData(404, 'Candidate job not found', '');
      }

      // Kiểm tra xem người đăng nhập có quyền sửa thông tin này hay không
      if (existingApplication.Candidate_ID !== candidateID) {
        return ResponseData(403, 'Permission denied', '');
      }

      // Kiểm tra xem Job_ID có tồn tại trong bảng Job hay không
      const existingJob = await this.prisma.job.findUnique({
        where: {
          ID: updatedData.Job_ID,
        },
      });

      // Nếu Job_ID không tồn tại, trả về lỗi
      if (!existingJob) {
        return ResponseData(404, 'Job not found', '');
      }

      // Thực hiện sửa đổi thông tin
      const updatedApplication = await this.prisma.candidate_job.update({
        where: {
          ID: candidateJobId,
          Candidate_ID: candidateID, // Điều kiện để xác định bản ghi cụ thể
        },
        data: {
          Job_ID: updatedData.Job_ID,
          CV_ID: updatedData.CV_ID,
        },
        include: {
          curriculum_vitae: true,
          job: true,
        },
      });

      return ResponseData(200, 'Update success', updatedApplication);
    } catch (error) {
      return ResponseData(500, 'Internal server error', error.message);
    }
  }

  async deleteApplication(candidateJobId: number, candidateID: number) {
    try {
      // Kiểm tra xem candidate_job có tồn tại hay không
      const existingApplication = await this.prisma.candidate_job.findUnique({
        where: {
          ID: candidateJobId,
        },
      });

      if (!existingApplication) {
        return ResponseData(404, 'Candidate job not found', '');
      }

      // Kiểm tra xem người đăng nhập có quyền xoá thông tin này hay không
      if (existingApplication.Candidate_ID !== candidateID) {
        return ResponseData(403, 'Permission denied', '');
      }

      // Thực hiện xoá
      await this.prisma.candidate_job.delete({
        where: {
          ID: candidateJobId,
        },
      });

      return ResponseData(200, 'Delete success', '');
    } catch (error) {
      return ResponseData(500, 'Internal server error', error.message);
    }
  }
}
