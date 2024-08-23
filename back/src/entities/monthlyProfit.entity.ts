import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'monthlyProfit' })
export class MonthlyProfit {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ nullable: false, type: 'int' })
  month: number;

  @Column({ nullable: false, type: 'int' })
  year: number;

  @Column({ nullable: false, type: 'int' })
  profit: number;
}
