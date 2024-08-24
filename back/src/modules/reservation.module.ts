import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ReservationController } from 'src/controllers/reservation.controller';
import { MonthlyProfit } from 'src/entities/monthlyProfit.entity';
import { Reservation } from 'src/entities/reservation.entity';
import { Room } from 'src/entities/room.entity';
import { Service } from 'src/entities/service.entity';
import { ReservationRepository } from 'src/repositories/reservation.repository';
import { ReservationService } from 'src/entities/s-r.entity';
import { GuestPrice } from 'src/entities/guestPrice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation,
      Room,
      Service,
      User,
      MonthlyProfit,
      ReservationService,
      GuestPrice,
    ]),
  ],
  controllers: [ReservationController],
  providers: [ReservationRepository],
})
export class ReservationModule {}
