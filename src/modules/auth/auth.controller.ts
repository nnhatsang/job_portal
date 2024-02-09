import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import * as argon from 'argon2';
import { PrismaClient, user } from '@prisma/client';
import { ResponseData } from 'src/utils/response.utils';
import { Response } from 'express';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private prisma = new PrismaClient();

  @Post('regisCa')
  async regisCandidate(@Body() registerDto: RegisterDto) {
    return this.authService.registerCandidate(registerDto);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Login successfully!' })
  @ApiResponse({ status: 401, description: 'Login fail!' })
  @UsePipes(ValidationPipe)
  login(@Body() loginUserDto: LoginUserDto): Promise<any> {

    return this.authService.login('token login', loginUserDto);
  }
}
