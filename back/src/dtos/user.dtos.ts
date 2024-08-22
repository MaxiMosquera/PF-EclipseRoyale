import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({description: 'User name', example: 'Max'})
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({description: 'User phone', example: '123456789'})
  @IsNotEmpty()
  @IsInt()
  readonly phone: number;

  @ApiProperty({description: 'User email', example: '5bqZt@example.com'})
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({description: 'User password', example: '123456789'})
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @ApiProperty({description: 'User address', example: '123456789'})
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty({description: 'User role', example: 'ADMIN'})
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role: Role;

  @ApiProperty({description: 'User status', example: 'ACTIVE'})
  @IsNotEmpty()
  @IsEnum(Status)
  readonly status: Status;
}
