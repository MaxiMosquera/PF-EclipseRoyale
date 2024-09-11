import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsInt,
} from 'class-validator';
import { ReservationStatus } from 'src/enum/reservationStatus.enums';
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
    example: ['restaurant', 'spa'],
    isArray: true,
  })
  @IsOptional()
  @IsString()
  services?: string[];

  @ApiProperty({
    description: 'Start Date of the reservation',
    example: '2024-08-05',
  })
  @IsInt()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: 'End Date of the reservation',
    example: '2024-08-10',
  })
  @IsInt()
  @IsNotEmpty()
  endDate: Date;

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

  @ApiPropertyOptional({
    description: 'Status of the reservation',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;
}

export class GetReservationsFiltersDto {
  @ApiPropertyOptional({
    description: 'Status of the reservation',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;

  @ApiProperty({
    description: 'Start Date of the reservation',
    example: '2024-08-05',
  })
  @IsInt()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    description: 'End Date of the reservation',
    example: '2024-08-10',
  })
  @IsInt()
  @IsOptional()
  endDate?: string;
}
