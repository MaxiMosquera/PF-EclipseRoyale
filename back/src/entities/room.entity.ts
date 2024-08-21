import { Category } from 'src/enum/room.enums';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Reservation } from './reservation.entity';
import { Features } from './features.entity';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false, type: 'int' })
  name: string;

  @Column({ nullable: false, type: 'int' })
  price: number;

  @Column({ nullable: false, type: 'enum', enum: Category })
  category: Category;

  
  @OneToOne(() => Reservation, (reservation) => reservation.room)
  reservation: Reservation;

  @OneToMany(() => Features, (features) => features.room)
  features: Features[];


  
}
