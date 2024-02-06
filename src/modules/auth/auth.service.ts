import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import ms from 'ms';
import { ResponseData } from 'src/utils/response.utils';
import { UserService } from '../user/user.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}
  private prisma = new PrismaClient();
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { Username: username },
    });
    // Validate user and password logic
    return user;
  }

  async validateUserById(userId: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { ID: userId },
    });
    // Validate user logic
    return user;
  }
  // processNewToken = async (refreshToken: string, response: Response) => {
  //   try {
  //     this.jwtService.verify(refreshToken, {
  //       secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
  //     });

  //     const user = await this.userService.findUserByToken(refreshToken);
  //     if (!user)
  //       throw new BadRequestException('Refresh Token của user không tồn tại');

  //     return await this.login(user, response);
  //   } catch (error) {
  //     throw new BadRequestException(
  //       'Refresh Token không hợp lệ vui lòng đăng nhập lại',
  //     );
  //   }
  // };
  createRefreshToken = (payload: any) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn:
        ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000,
    });
    return refresh_token;
  };

  async login(loginDto: { username: string; password: string }) {
    const { username, password } = loginDto;

    if (!username || !password) {
      throw new HttpException(
        'Username and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const user = await this.prisma.user.findUnique({
      where: { Username: username },
      include: { role: true },
    });

    // Kiểm tra xem người dùng có tồn tại không và password có khớp không
    if (!user || !bcrypt.compareSync(password, user.Password)) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const access_token = await this.jwtService.signAsync({ userId: user.ID });

    if (!user.refresh_token) {
      const refresh_token = this.createRefreshToken({ userId: user.ID });
      await this.prisma.user.update({
        where: { ID: user.ID },
        data: { refresh_token: refresh_token },
      });
    }

    const data = { access_token, user: user };
    return ResponseData(200, 'Success login', data);
  }
  catch(error) {
    console.error('Login error:', error);
    throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
  }

  async register(loginDto: { username: string; password: string }) {
    try {
      // Lấy vai trò thông thường từ cơ sở dữ liệu
      const normalUserRole = await this.prisma.role.findUnique({
        where: { ID: 2 },
      });

      // Kiểm tra xem vai trò có tồn tại không
      if (!normalUserRole) {
        throw new HttpException(
          'Normal user role not found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const hashedPassword = await bcrypt.hash(loginDto.password, 10);
      const newUser = await this.prisma.user.create({
        data: {
          Username: loginDto.username,
          Password: hashedPassword,
          UserRole_ID: normalUserRole.ID,
          RegisterDate: new Date(),
        },
      });

      // Trả về thông tin đăng ký thành công
      return {
        message: 'Registration successful',
        user: newUser,
      };
    } catch (error) {
      throw new HttpException('Registration failed', HttpStatus.BAD_REQUEST);
    }
  }
}
