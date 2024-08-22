import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Room } from './room.entity';

@Entity({ name: 'features' })
export class Features {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false, type: 'varchar', unique: true })
  name: string;

  @ManyToMany(() => Room, (room) => room.features)
  rooms: Room[]; // Cambié 'room' a 'rooms' para coincidir con el nombre de la relación en 'Room'
}
