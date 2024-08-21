import { Status } from 'src/enum/reservationHistory.enums';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { Reservation } from './reservation.entity';

@Entity({ name: 'reservationHistory' })
export class ReservationHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false, type: 'varchar' })
  reservationDate: Date;

  @Column({ nullable: false, type: 'enum', enum: Status })
  status: Status;

  @Column({ nullable: false, type: 'int' })
  price: number;

  @OneToOne(() => User, (user) => user.reservationHistory)
  user: User;

  @OneToOne(() => Reservation, (reservation) => reservation.reservationHistory)
  reservation: Reservation;
}
