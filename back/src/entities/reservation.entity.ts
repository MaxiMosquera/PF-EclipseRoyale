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
import { Service } from './service.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ReservationService } from './s-r.entity';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'reservations' })
export class Reservation {
  @ApiProperty({ description: 'The ID of the reservation.' })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();

  @ApiProperty({ description: 'The price of the reservation.' })
  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  @IsNotEmpty()
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

  @ApiProperty({ description: 'The first name of the clients guest.' })
  @Column({ nullable: true, type: 'varchar', length: 50 })
  @IsOptional()
  @IsString()
  guestName1?: string;

  @ApiProperty({ description: 'The last name of the clients guest.' })
  @Column({ nullable: true, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestLastName1?: string;

  @ApiProperty({ description: 'The first name of the clients second guest.' })
  @Column({ nullable: true, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestName2?: string;

  @ApiProperty({ description: 'The last name of the clients second guest.' })
  @Column({ nullable: true, type: 'varchar', length: 50 })
  @IsOptional()
  @IsString()
  guestLastName2?: string;

  @ApiProperty({ description: 'The first name of the clients third guest.' })
  @Column({ nullable: true, type: 'varchar', length: 50 })
  @IsOptional()
  @IsString()
  guestName3?: string;

  @ApiProperty({ description: 'The last name of the clients third guest.' })
  @Column({ nullable: true, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestLastName3?: string;

  @ApiProperty({ description: 'The first name of the clients fourth guest.' })
  @Column({ nullable: true, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestName4?: string;

  @ApiProperty({ description: 'The last name of the clients fourth guest.' })
  @Column({ nullable: true, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestLastName4?: string;

  @ApiProperty({ description: 'The id of the user who made the reservation.' })
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
