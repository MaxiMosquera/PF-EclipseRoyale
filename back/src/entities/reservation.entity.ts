import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Room } from './room.entity';
import { ReservationService } from './s-r.entity';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'int' })
  price: number;

  @Column({ nullable: false, type: 'date' })
  startDate: Date;

  @Column({
    nullable: false,
    type: 'enum',
    enum: ['active', 'finished'],
    default: 'active',
  })
  status: string;

  @Column({ nullable: false, type: 'date' })
  endDate: Date;

  @Column({ nullable: true, type: 'varchar' })
  guestName1?: string;

  @Column({ nullable: true, type: 'varchar' })
  guestLastName1?: string;

  @Column({ nullable: true, type: 'varchar' })
  guestName2?: string;

  @Column({ nullable: true, type: 'varchar' })
  guestLastName2?: string;

  @Column({ nullable: true, type: 'varchar' })
  guestName3?: string;

  @Column({ nullable: true, type: 'varchar' })
  guestLastName3?: string;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Room, (room) => room.reservations)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @OneToMany(
    () => ReservationService,
    (reservationService) => reservationService.reservation,
  )
  reservationServices: ReservationService[];
}
