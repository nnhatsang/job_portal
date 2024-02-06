import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'test1',
    description: 'Username',
  })
  @IsNotEmpty({ message: 'Field username cannot be empty' })
  @IsString({ message: 'Field username must be string' })
  username: string;

  @ApiProperty({
    example: 'test1',
    description: 'Password',
  })
  @IsNotEmpty({ message: 'Field password cannot be empty' })
  @IsString({ message: 'Field password must be string' })
  password: string;
}
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('regisCa')
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.register(createUserDto);
    return result;
  }

  @Post('login')
  @ApiBody({ type: CreateUserDto }) // Sử dụng DTO ở đây
  async login(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.login(createUserDto);
    return result;
  }
}
