import { Type } from 'src/enum/service.enums';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Reservation } from './reservation.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

@Entity({ name: 'services' })
export class Service {

  @ApiProperty({description: "Service ID"})
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();

  @ApiProperty({description: "Service price", example: 50})
  @Column({ nullable: false, type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({description: "Service type", example: "BREAKFAST"})
  @Column({ nullable: false, type: 'enum', enum: Type })
  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;

  @ApiProperty({description: "Reservation ID"})
  @ManyToOne(() => Reservation, (reservation) => reservation.services)
  reservation: Reservation;
}
