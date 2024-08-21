import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { Room } from './room.entity';
import { ReservationHistory } from './reservationHistory.entity';
import { Service } from './service.entity';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false, type: 'int' })
  price: number;

  @Column({ nullable: false, type: 'int' })
  startDay: number;

  @Column({ nullable: false, type: 'int' })
  startMonth: number;

  @Column({ nullable: false, type: 'int' })
  startYear: number;

  @Column({ nullable: false, type: 'int' })
  endDay: number;

  @Column({ nullable: false, type: 'int' })
  endMonth: number;

  @Column({ nullable: false, type: 'int' })
  endYear: number;

  @Column({ nullable: false, type: 'varchar' })
  guestName1?: string;

  @Column({ nullable: false, type: 'varchar' })
  guestLastName1?: string;

  @Column({ nullable: false, type: 'varchar' })
  guestName2?: string;

  @Column({ nullable: false, type: 'varchar' })
  guestLastName2?: string;

  @Column({ nullable: false, type: 'varchar' })
  guestName3?: string;

  @Column({ nullable: false, type: 'varchar' })
  guestLastName3?: string;

  @Column({ nullable: false, type: 'varchar' })
  guestName4?: string;

  @Column({ nullable: false, type: 'varchar' })
  guestLastName4?: string;

  //TODO make the relation with user
  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  //TODO make the relation with room
  @OneToOne(() => Room, (room) => room.reservation)
  room: Room;

  //TODO make the relation with reservationHistory
  @OneToOne(
    () => ReservationHistory,
    (reservationHistory) => reservationHistory.reservation,
  )
  reservationHistory: ReservationHistory;

  //TODO make the relation with services
  @OneToMany(() => Service, (service) => service.reservation)
  services: Service[];
}
