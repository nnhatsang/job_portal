import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // Username?: string;
  // Password?: "nnhatsang";
  Full_Name?: string;
  DateOfBirth?: Date;
  cityId?: number;
  // avatar?: string;
  Description?: string;
  Phone?: string;
  Degree?: string;
  Major?: string;
  Sex?: string;
}
