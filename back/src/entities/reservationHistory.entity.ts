import { Status } from 'src/enum/reservationHistory.enums';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { Reservation } from './reservation.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

@Entity({ name: 'reservationHistory' })
export class ReservationHistory {

  @ApiProperty ({description: 'The id of the reservation history'})
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();

  @ApiProperty ({description: 'The date of the reservation'})
  @Column({ nullable: false, type: 'varchar' })
  @IsNotEmpty()
  @IsDate()
  reservationDate: Date;

  @ApiProperty ({description: 'The status of the reservation'})
  @Column({ nullable: false, type: 'enum', enum: Status })
  @IsEnum(Status)
  status: Status;

  @ApiProperty ({description: 'The price of the reservation'})
  @Column({ nullable: false, type: 'int' })
  price: number;

  
  @OneToOne(() => User, (user) => user.reservationHistory)
  user: User;

  
  @OneToOne(() => Reservation, (reservation) => reservation.reservationHistory)
  reservation: Reservation;
}
