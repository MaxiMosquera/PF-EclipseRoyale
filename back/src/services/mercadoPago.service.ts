import { Injectable, BadRequestException } from '@nestjs/common';
import { preference } from 'src/config/mercadoPago'; // aca el cambio

@Injectable()
export class MercadoPagoService {
  constructor() {}

  async createPreference(body: any) {
    if (!body || !body.items || body.items.length === 0) {
      throw new BadRequestException('Invalid request body');
    }

    const preferenceData = {
      items: body.items.map((item: any) => ({
        id: item.id, // id de la reserva
        title: item.title, // nombre de la habitacion si es loft/suite/etc
        number: item.number, // numero de habitacion
        unit_price: item.unit_price, // precio de la reservacion
        quantity: item.quantity, // numero de habitaciones
      })),
      back_urls: {
        success: `http://localhost:3000/success/${body.items[0].id}`,
        failure: `https://pf-eclipseroyale.onrender.com/failure/${body.items[0].id}`,
      },
      auto_return: 'approved',
    };
    console.log('estoy aca');
    try {
      const response = await preference.create({ body: preferenceData });
      return { preferenceId: response.id };
    } catch (error) {
      throw new BadRequestException(
        `Failed to create preference: ${error.message}`,
      );
    }
  }
}
