import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { MercadoPagoService } from 'src/services/mercadoPago.service';

@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) { }

  @Post()
  createPreference(@Body() body: any): Promise<any> {
    return this.mercadoPagoService.createPreference(body);
  }

  @Get('success')
  success(@Res() res) {
    console.log('success');
    res.redirect('https://front-hotel-app-g8u2.vercel.app//payOk');
  }

  @Get('failure')
  failure(@Res() res) {
    console.log('failure');
    res.redirect('https://front-hotel-app-g8u2.vercel.app//payWrong');
  }
}