import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsInt,
  MinLength,
} from 'class-validator';
import { Role, Status } from 'src/enum/user.enums';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  readonly phone: number;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly adress: string;

  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;

  @IsNotEmpty()
  @IsEnum(Status)
  readonly status: Status;
}
