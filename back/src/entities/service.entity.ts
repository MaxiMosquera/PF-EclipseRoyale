import { Type } from 'src/enum/service.enums';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Reservation } from './reservation.entity';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false, type: 'int' })
  price: number;

  @Column({ nullable: false, type: 'enum', enum: Type })
  type: Type;

  @ManyToOne(() => Reservation, (reservation) => reservation.services)
  reservation: Reservation;
}
