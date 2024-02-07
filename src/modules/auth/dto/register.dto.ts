import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Field name cannot be empty' })
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Field name cannot be empty' })
  fullname: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'Field email cannot be empty' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Field password cannot be empty' })
  password: string;

//   @ApiProperty()
//   @IsString()
//   @IsNotEmpty({ message: 'Field gender cannot be empty' })
//   sex: string;
}
