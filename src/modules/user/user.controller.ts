import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('get-info')
  async getInfoUser(@Headers('authorization') authorizationHeader: string) {
    try {
      const token = authorizationHeader.replace('Bearer ', ''); // Lấy token từ header
      const result = await this.userService.getInfoUser(token);
      return result;
    } catch (error) {
      console.log(error)
    }
  }
}
