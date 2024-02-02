import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaClient } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  prisma = new PrismaClient();
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  //dung de xac thuc token truyen vao
  async validate(payload: { sub: number; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { ID: payload.sub },
    });

    // neu khong tim ra user
    delete user.Password;
    return user;
  }
}
