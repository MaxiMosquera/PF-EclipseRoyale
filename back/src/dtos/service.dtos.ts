import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'src/enum/service.enums';

export class CreateServiceDto {
  @ApiProperty({ description: 'The name of the service' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The price of the service' })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
