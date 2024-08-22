import { Role, Status } from 'src/enum/user.enums';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Reservation } from './reservation.entity';
import { ReservationHistory } from './reservationHistory.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, IsUUID } from 'class-validator';

@Entity({ name: 'users' })
export class User {

  @ApiProperty({description: 'User ID',example: '74a514f2-9c6c-4e72-a909-66aed6bfbd6f'})
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();
  @ApiProperty({description: "User's name", example: 'Maxim'})
  @Column({ nullable: false, type: 'varchar', length: 50 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({description: "User's phone number", example: '1234567890'})
  @IsNotEmpty()
  @IsNumber()
  @Column({ nullable: false, type: 'int' })
  phone: number;

  @ApiProperty({description: "User's email", example: 'qkDp8@example.com'})
  @IsEmail()
  @IsNotEmpty()
  @Column({ nullable: false, type: 'varchar', unique: true ,length: 50})
  email: string;

  @ApiProperty({description: "User's password", example: '1234567890'})
  @IsNotEmpty()
  @IsStrongPassword()
  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @ApiProperty({description: "User's image", example: 'image.png'})
  @IsOptional()
  @Column({ nullable: true, type: 'varchar' })
  image?: string;

  @ApiProperty({description: "User's adress", example: 'adress 2323'})
  @IsNotEmpty() 
  @IsString()
  @Column({ nullable: false, type: 'varchar', length: 50 })
  adress: string;

  @ApiProperty({description: "User's role", example: 'ADMIN'})
  @Column({ nullable: false, type: 'enum', enum: Role, default: Role.USER })
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty({description: "User's status", example: 'ACTIVE'})
  @Column({
    nullable: false,
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({description: "User's reservations"})
  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @ApiProperty({description: "User's reservation history"})
  @OneToOne(
    () => ReservationHistory,
    (reservationHistory) => reservationHistory.user,
  )
  reservationHistory: ReservationHistory;
}
