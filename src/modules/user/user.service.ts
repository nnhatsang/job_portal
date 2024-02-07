import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, user } from '@prisma/client';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';

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
      if (!mongoose.Types.ObjectId.isValid(id))
        throw new BadRequestException('id must be mongooId');

      return await this.prisma.user.update({
        where: { ID: id },
        data: { refresh_token: refreshToken },
      });
    } catch (error) {
      console.log(error);
    }
  };

  async getInfoUser(token: string) {
    try {
      const accessToken = this.jwtService.decode(token);
      const { userId } = accessToken.data;

      // Gọi service hoặc repository để lấy thông tin người dùng từ cơ sở dữ liệu
      // Giả sử bạn có một User Repository, bạn có thể sử dụng this.userRepository.findOne({ where: { nguoi_dung_id } });

      // Mock datafindUnique
      const getInfo = await this.prisma.user.findUnique({
        where: { ID: userId },
      });

      if (!getInfo) {
        throw new Error('User không tồn tại');
      }

      return { message: 'Get info User', data: getInfo, statusCode: 200 };
    } catch (error) {
      throw new Error('Lỗi...');
    }
  }
}
