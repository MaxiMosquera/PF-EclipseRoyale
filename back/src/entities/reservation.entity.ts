import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Room } from './room.entity';
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
import { ReservationStatus } from 'src/enum/reservationStatus.enums';

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

  @ApiProperty({ description: 'The start date of the reservation.' })
  @Column({ nullable: false, type: 'date' })
  startDate: Date;

  @ApiProperty({ description: 'The status of the reservation.' })
  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  @ApiProperty({ description: 'The end date of the reservation.' })
  @Column({ nullable: false, type: 'date' })
  endDate: Date;

  @ApiProperty({ description: 'The creation date of the reservation.' })
  @Column({ nullable: false, type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: "The first name of the client's first guest." })
  @Column({ nullable: true, type: 'varchar', length: 50 })
  @IsOptional()
  @IsString()
  guestName1?: string;

  @ApiProperty({ description: "The last name of the client's first guest." })
  @Column({ nullable: true, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestLastName1?: string;

  @ApiProperty({ description: "The first name of the client's second guest." })
  @Column({ nullable: true, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestName2?: string;

  @ApiProperty({ description: "The last name of the client's second guest." })
  @Column({ nullable: true, type: 'varchar', length: 50 })
  @IsOptional()
  @IsString()
  guestLastName2?: string;

  @ApiProperty({ description: "The first name of the client's third guest." })
  @Column({ nullable: true, type: 'varchar', length: 50 })
  @IsOptional()
  @IsString()
  guestName3?: string;

  @ApiProperty({ description: "The last name of the client's third guest." })
  @Column({ nullable: true, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestLastName3?: string;

  @ApiProperty({ description: "The first name of the client's fourth guest." })
  @Column({ nullable: true, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestName4?: string;

  @ApiProperty({ description: "The last name of the client's fourth guest." })
  @Column({ nullable: true, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestLastName4?: string;

  @ApiProperty({ description: 'The user who made the reservation.' })
  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ApiProperty({ description: 'The room associated with the reservation.' })
  @ManyToOne(() => Room, (room) => room.reservations)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @ApiProperty({
    description:
      'The list of services associated with the reservation through the ReservationService entity.',
    type: () => ReservationService,
    isArray: true,
  })
  @OneToMany(
    () => ReservationService,
    (reservationService) => reservationService.reservation,
  )
  reservationServices: ReservationService[];
}
