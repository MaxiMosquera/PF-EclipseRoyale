import { Module } from '@nestjs/common';
import { MercadoPagoController } from 'src/controllers/mercadoPago.controller';
import { ReservationRepository } from 'src/repositories/reservation.repository';
import { MercadoPagoService } from 'src/services/mercadoPago.service';
import { ReservationModule } from './reservation.module';

@Module({
  imports: [ReservationModule],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService, ReservationRepository],
})
export class MercadopagoModule {}