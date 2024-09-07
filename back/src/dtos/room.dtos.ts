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
  @IsString()
  category: string;
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

  @ApiProperty({ description: 'The names of the features of the room' })
  @IsOptional()
  featuresNames?: string[];

  @ApiProperty({
    description: 'The names of the features to delete of the room',
  })
  @IsOptional()
  featuresToDelete?: string[];
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
  @ApiProperty({
    description: 'Available start date of the reservation',
    example: '2024-08-05',
  })
  @IsInt()
  @IsOptional()
  startingDate?: string;

  @ApiProperty({
    description: 'Available end date of the reservation',
    example: '2024-08-10',
  })
  @IsInt()
  @IsOptional()
  endingDate?: string;

  @ApiPropertyOptional({ description: 'number of category', example: '1' })
  @IsOptional()
  @IsInt()
  category?: string;

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

  @ApiPropertyOptional({
    description: 'Room number',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  number?: number;
}
