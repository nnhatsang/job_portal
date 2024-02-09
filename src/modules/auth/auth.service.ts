import {
  BadRequestException,
  Body,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { PrismaClient, user } from '@prisma/client';
import * as argon from 'argon2';
import { ResponseData } from 'src/utils/response.utils';
import { InjectModel } from '@nestjs/mongoose';
import ms from 'ms';
import { IPayloadToken } from './auth.interface';
import { Response } from 'express';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}
  prisma = new PrismaClient();
  async registerCandidate(registerDto: RegisterDto) {
    try {
      const role = await this.prisma.role.findUnique({
        where: { ID: 3 },
      });

      if (!role) {
        throw new HttpException(
          'Normal user role not found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const userExist = await this.prisma.user.findMany({
        where: {
          Username: registerDto.username,
        },
      });

      if (userExist && userExist.length > 0) {
        throw new BadRequestException(
          `Field username: ${registerDto.username} already exists in the user table`,
        );
      }

      const emailExistInCandidate = await this.prisma.candidate.findMany({
        where: {
          Email: registerDto.email,
        },
      });

      if (emailExistInCandidate && emailExistInCandidate.length > 0) {
        throw new BadRequestException(
          `Field email: ${registerDto.email} already exists in the candidate table`,
        );
      }

      const passwordHash = await argon.hash(registerDto.password);
      const newUser = await this.prisma.user.create({
        data: {
          Username: registerDto.username,
          Password: passwordHash,
          UserRole_ID: role.ID,
          RegisterDate: new Date(),
        },
        select: {
          RegisterDate: true,
          Username: true,
          ID: true,
        },
      });
      const newCandidate = await this.prisma.candidate.create({
        data: {
          Full_Name: registerDto.fullname,
          Email: registerDto.email,
          User_ID: newUser.ID,
        },
        select: {
          Full_Name: true,
          Email: true,
        },
      });
      const responseData = {
        message: 'signUp Success',
        user: {
          ID: newUser.ID,
          Username: newUser.Username,
          RegisterDate: newUser.RegisterDate,
        },
        candidate: {
          Full_Name: newCandidate.Full_Name,
          Email: newCandidate.Email,
        },
      };
      return ResponseData(201, 'signUp Success', responseData);
    } catch (error) {
      // return ResponseData(500, 'Internal Server Error', error);
      throw error;
    }
  }

  createRefreshToken = (payload: any) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')),
    });
    return refresh_token;
  };

  async login(sub = 'token login', loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { Username: loginUserDto.username }, // Use 'Username' instead of 'username'
    });
    if (!user) {
      throw new HttpException('user is not exist', HttpStatus.UNAUTHORIZED);
    }
    const checkPass = await argon.verify(user.Password, loginUserDto.password);
    if (!checkPass) {
      throw new HttpException(
        'Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    let candidateID = null;

    if (user.UserRole_ID === 3) {
      // Nếu user.Role là 3, thực hiện truy vấn để lấy candidateID
      const candidate = await this.prisma.candidate.findFirst({
        where: { User_ID: user.ID },
      });

      if (candidate) {
        candidateID = candidate.ID;
      }
      // console.log(candidateID);
    }
    const payload = {
      sub,
      userId: user.ID,
      username: user.Username,
      candidateID,
    };
    const refresh_token = this.createRefreshToken(payload);

    await this.userService.updateUserToken(refresh_token, user.ID);
    const data = {
      sub,
      refresh_token,
      user: {
        userID: user.ID,
        userName: user.Username,
        Role: user.UserRole_ID,
        candidateID,
      },
    };

    return ResponseData(201, 'login success', data);
  }
}
