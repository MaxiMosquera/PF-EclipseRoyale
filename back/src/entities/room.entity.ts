import { Category } from 'src/enum/room.enums';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Reservation } from './reservation.entity';
import { Features } from './features.entity';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false, type: 'int' })
  number: number;

  @Column({ nullable: false, type: 'int' })
  price: number;

  @Column({ nullable: false, type: 'enum', enum: Category, unique: false })
  category: Category;

  @OneToOne(() => Reservation, (reservation) => reservation.room)
  reservation: Reservation;

  @ManyToMany(() => Features, (features) => features.rooms) // Asegúrate de que esto esté correcto
  @JoinTable() // Asegúrate de que esto esté presente si usas una tabla de unión
  features: Features[];
}
