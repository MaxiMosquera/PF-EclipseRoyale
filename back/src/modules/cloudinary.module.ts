import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { Features } from 'src/entities/features.entity';
import { Reservation } from 'src/entities/reservation.entity';
import { Room } from 'src/entities/room.entity';
import { Service } from 'src/entities/service.entity';
import { FeatureRepository } from 'src/repositories/feature.repository';
import { RoomRepository } from 'src/repositories/room.repository';
import { ServiceRepository } from 'src/repositories/services.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { CloudinaryService } from 'src/services/cloudinary.service';
import { CloudinaryController } from 'src/controllers/cloudinary.controller';
import { MonthlyProfit } from 'src/entities/monthlyProfit.entity';
import { ReservationService } from 'src/entities/s-r.entity';
import { GuestPrice } from 'src/entities/guestPrice.entity';
import { MailService } from 'src/services/mail.service';
import { MercadoPagoService } from 'src/services/mercadoPago.service';
import { ReservationRepository } from 'src/repositories/reservation.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Room,
      Reservation,
      Features,
      Service,
      Reservation,
      MonthlyProfit,
      ReservationService,
      GuestPrice,
    ]),
  ],
  controllers: [CloudinaryController],
  providers: [
    UserRepository,
    RoomRepository,
    ServiceRepository,
    MailService,
    FeatureRepository,
    CloudinaryService,
    CloudinaryConfig,
    MercadoPagoService,
    ReservationRepository
  ],
})
export class CloudinaryModule {}
