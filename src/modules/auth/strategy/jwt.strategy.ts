import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PrismaClient, user } from '@prisma/client';
import { UserService } from 'src/modules/user/user.service';
import { CandidateDto, UserDto } from '../dto/user.dto';
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    authService: AuthService,
    private usersService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,

      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }
  prisma = new PrismaClient();
  async validate(payload: { userId: number }) {
    try {
      const userId = parseInt(payload.userId.toString(), 10);
      // console.log(userId);
      // console.log(payload.userId);
      const user = await this.prisma.user.findUnique({
        where: {
          ID: userId,
        },
        include: {
          candidate: true,
          company: true,
          role: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      const candidate = await this.prisma.candidate.findFirst({
        where: { User_ID: userId },
      });
      // const userDto = new UserDto(user);

      delete user.Password;

      const candidateInfo = candidate ? new CandidateDto(candidate) : undefined;

      // Omit sensitive information from the user object if needed

      const userDto = new UserDto(user, 'Candidate', candidate, candidateInfo);
      return userDto;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
