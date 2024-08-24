import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Reservation } from './reservation.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ReservationService } from './s-r.entity';
import { Type } from 'src/enum/service.enums';

@Entity({ name: 'services' })
export class Service {
  @ApiProperty({ description: 'Service ID' })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();

  @ApiProperty({ description: 'Service price', example: 50 })
  @Column({ nullable: false, type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Service type',
    example: 'BREAKFAST',
  })
  @Column({ nullable: false, type: 'enum', enum: Type })
  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;

  @ApiProperty({
    description: 'List of reservations associated with this service.',
    type: [ReservationService],
  })
  @OneToMany(
    () => ReservationService,
    (reservationService) => reservationService.service,
  )
  reservationServices: ReservationService[];
}
