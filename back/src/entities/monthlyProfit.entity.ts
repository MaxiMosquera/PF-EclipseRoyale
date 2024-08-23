import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

@Entity({ name: 'monthlyProfit' })
export class MonthlyProfit {
  @ApiProperty({
    description: 'Unique identifier for the monthly profit record.',
  })
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string = uuid();

  @ApiProperty({ description: 'Month of the profit record.', example: 7 })
  @Column({ nullable: false, type: 'int' })
  @IsInt()
  @IsNotEmpty()
  month: number;

  @ApiProperty({ description: 'Year of the profit record.', example: 2024 })
  @Column({ nullable: false, type: 'int' })
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    description: 'Profit for the specified month and year.',
    example: 5000,
  })
  @Column({ nullable: false, type: 'int' })
  @IsInt()
  @IsNotEmpty()
  profit: number;
}
