import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { Room } from './room.entity';
import { ReservationHistory } from './reservationHistory.entity';
import { Service } from './service.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@Entity({ name: 'reservations' })
export class Reservation {
  @ApiProperty({description: "The ID of the reservation."})
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();

  @ApiProperty({description: "The price of the reservation."})
  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({description: "The start day of the reservation."})
  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  startDay: number;

  @ApiProperty({description: "The start month of the reservation."})
  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  startMonth: number;

  @ApiProperty({description: "The start year of the reservation."})
  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  startYear: number;

  @ApiProperty({description: "The end day of the reservation."})
  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  endDay: number;

  @ApiProperty({description: "The end month of the reservation."})
  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  endMonth: number;

  @ApiProperty({description: "The end year of the reservation."})
  @Column({ nullable: false, type: 'int' })
  @IsNumber()
  endYear: number;

  @ApiProperty({description: "The first name of the clients guest."})
  @Column({ nullable: false, type: 'varchar', length: 50 })
  @IsOptional()
  @IsString()
  guestName1?: string;

  @ApiProperty({description: "The last name of the clients guest."})
  @Column({ nullable: false, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestLastName1?: string;

  @ApiProperty({description: "The first name of the clients second guest."})
  @Column({ nullable: false, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestName2?: string;

  @ApiProperty({description: "The last name of the clients second guest."})
  @Column({ nullable: false, type: 'varchar', length: 50 })
  @IsOptional()
  @IsString()
  guestLastName2?: string;

  @ApiProperty({description: "The first name of the clients third guest."})
  @Column({ nullable: false, type: 'varchar', length: 50 })
  @IsOptional()
  @IsString()
  guestName3?: string;

  @ApiProperty({description: "The last name of the clients third guest."})
  @Column({ nullable: false, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestLastName3?: string;

  @ApiProperty({description: "The first name of the clients fourth guest."})
  @Column({ nullable: false, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestName4?: string;

  @ApiProperty({description: "The last name of the clients fourth guest."})
  @Column({ nullable: false, type: 'varchar' })
  @IsOptional()
  @IsString()
  guestLastName4?: string;

  @ApiProperty({description: "The id of the user who made the reservation."})
  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ApiProperty({description: "The id of the room that was reserved."})
  @OneToOne(() => Room, (room) => room.reservation)
  room: Room;

  @ApiProperty({description: "The relation between the reservation and its history."})
  @OneToOne(
    () => ReservationHistory,
    (reservationHistory) => reservationHistory.reservation,
  )
  reservationHistory: ReservationHistory;

  @ApiProperty({description: "The list of services that were reserved."})
  @OneToMany(() => Service, (service) => service.reservation)
  services: Service[];
}
