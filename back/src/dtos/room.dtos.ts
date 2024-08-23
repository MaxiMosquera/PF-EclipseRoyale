import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Category } from 'src/enum/room.enums';

export class CreateRoomDto {

  @ApiProperty({description: 'The number of the room'})
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @ApiProperty({description: 'The price of the room'})
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({description: 'The category of the room'})
  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;
}

export class UpdateRoomDto {

  @ApiProperty({description: 'The number of the room'})
  @IsOptional()
  @IsInt()
  number?: number;

  @ApiProperty({description: 'The price of the room'})
  @IsOptional()
  @IsInt()
  price?: number;

  @ApiProperty({description: 'The category of the room'})
  @IsOptional()
  image?: string;

  @ApiProperty({description: 'The category of the room'})
  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @ApiProperty({description: 'The id of the reservation'})
  @IsOptional()
  @IsUUID()
  reservationId?: string;

  @ApiProperty({description: 'The id of the features of the room'})
  @IsOptional()
  featuresIds?: string[];
}

export class CreateFeatureDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(Category)
  roomCategory: Category;
}

export class FilterRoomsDto {
  startDay?: number;
  startMonth?: number;
  startYear?: number;

  endDay?: number;
  endMonth?: number;
  endYear?: number;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @IsOptional()
  @IsInt()
  minPrice?: number;

  @IsOptional()
  @IsInt()
  maxPrice?: number;
}
