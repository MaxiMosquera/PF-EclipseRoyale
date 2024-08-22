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
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;
}

export class UpdateRoomDto {
  @IsOptional()
  @IsInt()
  number?: number;

  @IsOptional()
  @IsInt()
  price?: number;

  @IsOptional()
  image?: string;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @IsOptional()
  @IsUUID()
  reservationId?: string;

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
