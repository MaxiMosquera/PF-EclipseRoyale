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
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@Entity({ name: 'rooms' })
export class Room {
  @ApiProperty({ description: "Room's ID", type: String })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();

  @ApiProperty({ description: "Room's number", type: Number })
  @Column({ nullable: false, type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @ApiProperty({ description: "Room's price", type: Number })
  @Column({ nullable: false, type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: "Room's category" })
  @Column({ nullable: false, type: 'varchar' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ description: "Room's image" })
  @Column('simple-array', { nullable: true })
  @IsOptional()
  @IsString()
  images?: string[];

  @ApiProperty({ description: "Room's availability" })
  @Column({ default: true }) // Valor predeterminado, puede ser true o false
  isAvailable: boolean;

  @ApiProperty({ description: "Room's booking status" })
  @Column({ default: false }) // Valor predeterminado, puede ser true o false
  isBooked: boolean;

  @ApiProperty({ description: "Room's reservation ID" })
  @OneToMany(() => Reservation, (reservation) => reservation.room)
  reservations: Reservation[];

  @ApiProperty({ description: "Room's features" })
  @ManyToMany(() => Features, (features) => features.rooms)
  @JoinTable()
  features: Features[];
}
