import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, user } from '@prisma/client';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

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
}
