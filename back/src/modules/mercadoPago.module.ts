import { Module } from '@nestjs/common';
import { MercadoPagoController } from 'src/controllers/mercadoPago.controller';
import { MercadoPagoService } from 'src/services/mercadoPago.service';
import { ReservationModule } from './reservation.module';
import { MailService } from 'src/services/mail.service';

@Module({
  imports: [ReservationModule],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService, MailService],
})
export class MercadopagoModule {}
