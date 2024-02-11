import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
  Req,
  Put,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ResponseData } from 'src/utils/response.utils';
import { CreateCurriculumVitaeDto } from '../curriculum-vitae/dto/create-cv.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('info-user')
  @UseGuards(AuthGuard('jwt'))
  async getInfoUser(@Req() request: Request) {
    // await this.userService.getInfoUser(request.user.ID);
    const userId = (request.user as any).ID;

    return this.userService.getInfoUser(userId);
  }

  @Get('list_applications')
  @UseGuards(AuthGuard('jwt'))
  async listApplications(@Req() req) {
    const userId = req.user.candidateInfo.candidateID; // Lấy id từ user sau khi đã được xác thực
    return this.userService.listApplications(userId);
  }
  @Get('list_cv')
  @UseGuards(AuthGuard('jwt'))
  async listcvs(@Req() req) {
    const userId = req.user.candidateInfo.candidateID; // Lấy id từ user sau khi đã được xác thực
    return this.userService.listCv(userId);
  }

  @Put(':userId')
  @UseGuards(AuthGuard('jwt'))
  async updateUserInfo(
    @Param('userId') userId: string,
    @Body() updateUserData: UpdateUserDto,
  ) {
    try {
      const data = await this.userService.updateUser(
        parseInt(userId, 10),
        updateUserData,
      );
      return ResponseData(200, 'update success', data);
    } catch (error) {
      throw new UnauthorizedException(
        'Unauthorized to update user information',
      );
    }
  }
}
