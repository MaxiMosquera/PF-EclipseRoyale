import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Service } from './service.entity';

@Entity({ name: 'reservation_services' })
export class ReservationService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Reservation,
    (reservation) => reservation.reservationServices,
  )
  reservation: Reservation;

  @ManyToOne(() => Service, (service) => service.reservationServices)
  service: Service;

  @Column({ nullable: false, type: 'int' })
  price: number;
}
