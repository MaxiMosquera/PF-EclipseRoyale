import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ReservationRepository } from 'src/repositories/reservation.repository';
import { MercadoPagoService } from 'src/services/mercadoPago.service';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService,
    private readonly reservationRepository: ReservationRepository
  ) { }

  @Post()
  createPreference(@Body() body: any): Promise<any> {
    return this.mercadoPagoService.createPreference(body);
  }

  @Get('success/:id')
  success(@Res() res, @Param('id') id ){
    console.log('success');
    this.reservationRepository.changestatusToPaid(id)
    res.redirect('https://front-hotel-app-g8u2.vercel.app//payOk');
  }

  @Get('failure')
  failure(@Res() res) {
    console.log('failure');
    res.redirect('https://front-hotel-app-g8u2.vercel.app//payWrong');
  }
}