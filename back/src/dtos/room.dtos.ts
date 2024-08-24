import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'The number of the room' })
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @ApiProperty({ description: 'The price of the room' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'The category of the room' })
  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;
}

export class UpdateRoomDto {
  @ApiProperty({ description: 'The number of the room' })
  @IsOptional()
  @IsInt()
  number?: number;

  @ApiProperty({ description: 'The price of the room' })
  @IsOptional()
  @IsInt()
  price?: number;

  @ApiProperty({ description: 'The category of the room' })
  @IsOptional()
  image?: string;

  @ApiProperty({ description: 'The category of the room' })
  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @ApiProperty({ description: 'The id of the reservation' })
  @IsOptional()
  @IsUUID()
  reservationId?: string;

  @ApiProperty({ description: 'The id of the features of the room' })
  @IsOptional()
  featuresIds?: string[];
}

export class CreateFeatureDto {
  @ApiProperty({ description: 'Name of the feature', example: 'Sea View' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Category of the room the feature applies to',
    enum: Category,
  })
  @IsOptional()
  @IsEnum(Category)
  roomCategory?: Category;
}

export class FilterRoomsDto {
  @ApiPropertyOptional({
    description: 'Start day of the reservation filter',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  startDay?: number;

  @ApiPropertyOptional({
    description: 'Start month of the reservation filter',
    example: 8,
  })
  @IsOptional()
  @IsInt()
  startMonth?: number;

  @ApiPropertyOptional({
    description: 'Start year of the reservation filter',
    example: 2024,
  })
  @IsOptional()
  @IsInt()
  startYear?: number;

  @ApiPropertyOptional({
    description: 'End day of the reservation filter',
    example: 5,
  })
  @IsOptional()
  @IsInt()
  endDay?: number;

  @ApiPropertyOptional({
    description: 'End month of the reservation filter',
    example: 8,
  })
  @IsOptional()
  @IsInt()
  endMonth?: number;

  @ApiPropertyOptional({
    description: 'End year of the reservation filter',
    example: 2024,
  })
  @IsOptional()
  @IsInt()
  endYear?: number;

  @ApiPropertyOptional({ description: 'Category of the room', enum: Category })
  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @ApiPropertyOptional({
    description: 'Minimum price of the room',
    example: 100,
  })
  @IsOptional()
  @IsInt()
  minPrice?: number;

  @ApiPropertyOptional({
    description: 'Maximum price of the room',
    example: 500,
  })
  @IsOptional()
  @IsInt()
  maxPrice?: number;
}
