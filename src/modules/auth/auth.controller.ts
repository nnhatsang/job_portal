import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import * as argon from 'argon2';
import { PrismaClient } from '@prisma/client';
import { ResponseData } from 'src/utils/response.utils';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private prisma = new PrismaClient();

  @Post('regisCa')
  async regisCandidate(@Body() registerDto: RegisterDto) {
    return this.authService.registerCandidate(registerDto);
  }
}
