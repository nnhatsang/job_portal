import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, candidate_job, user } from '@prisma/client';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { CreateCurriculumVitaeDto } from './dto/create-cv.dto';

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}

  prisma = new PrismaClient();

  findUserByToken = async (refreshToken: string): Promise<user> => {
    try {
      const user = await this.prisma.user.findFirst({
        where: { refresh_token: { equals: refreshToken } },
      });

      if (!user) throw new NotFoundException('user not exist');

      return JSON.parse(JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };
  updateUserToken = async (refreshToken: string, id) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('ID must be a valid MongoDB ObjectId');
      }

      const updatedUser = await this.prisma.user.update({
        where: { ID: id }, // Parse the ID to an integer if necessary
        data: { refresh_token: refreshToken },
      });

      if (!updatedUser) {
        throw new NotFoundException('User not found'); // Handle the case where the user is not found
      }

      return updatedUser;
    } catch (error) {
      // Handle or log the error appropriately
      console.error(error);
      throw error; // Re-throw the error for further handling, if needed
    }
  };

  async getInfoUser(userId: string) {
    try {
      const getInfo = await this.prisma.user.findUnique({
        where: { ID: parseInt(userId, 10) },
        include: { role: true },
      });

      if (!getInfo) {
        throw new Error('User không tồn tại');
      }
      let candidateID = null;

      if (getInfo.UserRole_ID === 3) {
        // Nếu user.Role là 3, thực hiện truy vấn để lấy candidateID
        const candidate = await this.prisma.candidate.findFirst({
          where: { User_ID: getInfo.ID },
        });

        if (candidate) {
          candidateID = await this.prisma.candidate.findUnique({
            where: { ID: candidate.ID },
          });
        }
      }
      delete getInfo.Password;
      const imfoCandiUser = {
        ...candidateID,
        ...getInfo,
      };

      console.log(imfoCandiUser);
      return { message: 'Get info User', data: imfoCandiUser, statusCode: 200 };
    } catch (error) {
      throw new Error('Lỗi...');
    }
  }

  async listApplications(userId: number): Promise<candidate_job[]> {
    return this.prisma.candidate_job.findMany({
      where: {
        Candidate_ID: userId,
      },
      include: {
        job: true,
      },
    });
  }

  async updateUser(userId: any, updateUserData: UpdateUserDto) {
    // Update candidate information using Prisma
    // const updatedUser = await this.prisma.user.update({
    //   where: { ID: parseInt(userId, 10) },
    //   data: {
    //     // Username: updateUserData.username,
    //     // Password: updateUserData.Password,

    //   },
    // });
    // if (!updatedUser) {
    //   throw new NotFoundException('User not found');
    // }
    // Update candidate information using Prisma
    const candidate = await this.prisma.candidate.findFirst({
      where: { User_ID: parseInt(userId, 10) },
    });
    if (candidate) {
      const updatedCandidate = await this.prisma.candidate.update({
        where: { ID: candidate.ID },
        data: {
          ...updateUserData,
          // Add other candidate properties
        },
      });
      if (!updatedCandidate) {
        throw new NotFoundException('Candidate not found');
      }
      console.log(updateUserData);
      // Return updated user and candidate
      return {
        // user: updatedUser,
        candidate: updatedCandidate,
      };
    }
  }

  // async createCurriculumVitae(
  //   candidateId: number,
  //   cvData: CreateCurriculumVitaeDto,
  // ) {

  //   console.log('cvData:', cvData); // In ra giá trị của cvData

  //   const createdCv = await this.prisma.curriculum_vitae.create({
  //     data: {
  //       Candidate_ID: candidateId,
  //       Is_Deleted: false,
  //       ...cvData,
  //     },
  //   });
  //   console.log('CareerGoals,CareerGoals', createdCv);

  //   return createdCv;
  // }

  async createCurriculumVitae(
    candidateId: number,
    cvData: CreateCurriculumVitaeDto,
  ) {
    console.log('cvData:', cvData); // In ra giá trị của cvData

    const createdCv = await this.prisma.curriculum_vitae.create({
      data: {
        Candidate_ID: candidateId,
        Is_Deleted: false,
        ...cvData,
      },
    });
    console.log('CareerGoals,CareerGoals', createdCv);

    return createdCv;
  }
}
