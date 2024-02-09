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
import { CreateCurriculumVitaeDto } from './dto/create-cv.dto';

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
  // async getInfoUser(@Headers('authorization') authorizationHeader: string) {
  //   try {
  //     const token = authorizationHeader.replace('Bearer ', ''); // Lấy token từ header
  //     const result = await this.userService.getInfoUser(token);
  //     return result;
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  @Get('list_applications')
  @UseGuards(AuthGuard('jwt'))
  async listApplications(@Req() req) {
    const userId = req.user.id; // Lấy id từ user sau khi đã được xác thực
    return this.userService.listApplications(userId);
  }

  @Patch(':userId')
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
      // return {
      //   message: 'User information updated successfully',
      //   statusCode: 200,
      // };
    } catch (error) {
      throw new UnauthorizedException(
        'Unauthorized to update user information',
      );
    }
  }

  @Post('createCV')
  @UseGuards(AuthGuard('jwt'))
  async createCurriculumVitae(
    @Req() req,
    // @Param('candidateId') candidateId: string,
    @Body() createCurriculumVitaeDto: CreateCurriculumVitaeDto,
  ) {
    try {
      console.log('Before calling createCurriculumVitae');

      const candidateId = req.user.candidateInfo.candidateID;
      console.log(candidateId);
      // try {
      const result = await this.userService.createCurriculumVitae(
        parseInt(candidateId, 10),
        createCurriculumVitaeDto,
      );

      return {
        message: 'Curriculum Vitae created successfully',
        statusCode: 201,
        content: result,
        data: createCurriculumVitaeDto,
      };
    } catch (error) {
      throw new NotFoundException('Candidate not found');
    }
  }
}
