import { Module } from '@nestjs/common';
import { MercadoPagoController } from 'src/controllers/mercadoPago.controller';
import { MercadoPagoService } from 'src/services/mercadoPago.service';
import { ReservationModule } from './reservation.module';

@Module({
  imports: [ReservationModule],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
})
export class MercadopagoModule {}
