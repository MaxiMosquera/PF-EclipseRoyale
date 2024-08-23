import { Role, Status } from 'src/enum/user.enums';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Reservation } from './reservation.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({ nullable: false, type: 'int' })
  phone: number;

  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  image?: string;

  @Column({ nullable: false, type: 'varchar' })
  adress: string;

  @Column({ nullable: false, type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
