import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  prisma = new PrismaClient();

  async signIn(dto: AuthDto) {}

  async signUp(dto: AuthDto) {
    const Password = await argon.hash(dto.Password);

    try {
      const user = await this.prisma.user.create({
        data: {
          Username: dto.Username,
          Password,
          RegisterDate: new Date(), // Giả sử RegisterDate là ngày hiện tại
          IsDeleted: 0, //
        },
      });

      return this.signToken(user.ID, user.Username);
    } catch (error) {
      // Handle errors here
    }
  }

  async signToken(
    userId: number,
    username: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      username,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
