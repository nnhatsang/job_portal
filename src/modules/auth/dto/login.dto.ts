import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
//   @IsEmail()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
