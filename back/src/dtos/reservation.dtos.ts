import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsInt,
} from 'class-validator';
import { Type } from 'src/enum/service.enums';

export class CreateReservationDto {
  @ApiProperty({
    description: 'ID of the room to reserve',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  roomId: string;

  @ApiPropertyOptional({
    description: 'List of service types for the reservation',
    enum: Type,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(Type, { each: true })
  services?: Type[];

  @ApiProperty({ description: 'Start day of the reservation', example: 1 })
  @IsInt()
  @IsNotEmpty()
  startDay: number;

  @ApiProperty({ description: 'Start month of the reservation', example: 8 })
  @IsInt()
  @IsNotEmpty()
  startMonth: number;

  @ApiProperty({ description: 'Start year of the reservation', example: 2024 })
  @IsInt()
  @IsNotEmpty()
  startYear: number;

  @ApiProperty({ description: 'End day of the reservation', example: 5 })
  @IsInt()
  @IsNotEmpty()
  endDay: number;

  @ApiProperty({ description: 'End month of the reservation', example: 8 })
  @IsInt()
  @IsNotEmpty()
  endMonth: number;

  @ApiProperty({ description: 'End year of the reservation', example: 2024 })
  @IsInt()
  @IsNotEmpty()
  endYear: number;

  @ApiPropertyOptional({ description: 'First name of the first guest' })
  @IsOptional()
  @IsString()
  guestName1?: string;

  @ApiPropertyOptional({ description: 'Last name of the first guest' })
  @IsOptional()
  @IsString()
  guestLastName1?: string;

  @ApiPropertyOptional({ description: 'First name of the second guest' })
  @IsOptional()
  @IsString()
  guestName2?: string;

  @ApiPropertyOptional({ description: 'Last name of the second guest' })
  @IsOptional()
  @IsString()
  guestLastName2?: string;

  @ApiPropertyOptional({ description: 'First name of the third guest' })
  @IsOptional()
  @IsString()
  guestName3?: string;

  @ApiPropertyOptional({ description: 'Last name of the third guest' })
  @IsOptional()
  @IsString()
  guestLastName3?: string;
}

export class GetReservationsFiltersDto {
  @ApiPropertyOptional({
    description: 'Status of the reservation',
    example: 'active',
  })
  @IsOptional()
  @IsString()
  status?: string;

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
}
