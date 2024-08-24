import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Service } from './service.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

@Entity({ name: 'reservation_services' })
export class ReservationService {
  @ApiProperty({ description: 'The ID of the reservation-service relation.' })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The reservation associated with this service.' })
  @ManyToOne(
    () => Reservation,
    (reservation) => reservation.reservationServices,
  )
  reservation: Reservation;

  @ApiProperty({ description: 'The service associated with this reservation.' })
  @ManyToOne(() => Service, (service) => service.reservationServices)
  service: Service;

  @ApiProperty({
    description: 'The price of the service for this reservation.',
  })
  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
