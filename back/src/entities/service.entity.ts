import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReservationService } from './s-r.entity';
import { Type } from 'src/enum/service.enums';

@Entity({ name: 'services' })
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'int' })
  price: number;

  @Column({ nullable: false, type: 'enum', enum: Type })
  type: Type;

  @OneToMany(
    () => ReservationService,
    (reservationService) => reservationService.service,
  )
  reservationServices: ReservationService[];
}
