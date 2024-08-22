import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Type } from 'src/enum/service.enums';

export class CreateServiceDto {


  
  @ApiProperty({description: 'The price of the service'})
  @IsNotEmpty()
  @IsNumber()
  price: number;


  @ApiProperty({description: 'The type of the service'})
  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;

  
}
