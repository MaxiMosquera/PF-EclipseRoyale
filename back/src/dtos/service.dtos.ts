import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Type } from 'src/enum/service.enums';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;
}
