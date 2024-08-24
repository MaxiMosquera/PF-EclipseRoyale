import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Room } from './room.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@Entity({ name: 'features' })
export class Features {
  @ApiProperty({description: 'The id of the feature'})
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();

  @ApiProperty({description: 'The name of the feature'})
  @Column({ nullable: false, type: 'varchar', unique: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({description: 'the id of the room that the features belongs to'})
  @ManyToMany(() => Room, (room) => room.features)
  rooms: Room[]; // Cambié 'room' a 'rooms' para coincidir con el nombre de la relación en 'Room'
}
