import { Injectable } from '@nestjs/common';
import { preference } from 'src/config/mercadopago';


@Injectable()
export class MercadoPagoService {
  constructor() {}

  async createPreference(body: any) {
    
    const preferenceData = {
        items: body.items.map(item => ({
        id: item.id, //id de la reserva
        title: item.title,// nombre de la habitacion si es loft/suite/etc
        number: item.number,//numero de habitacion
        unit_price: item.unit_price, // precio de la reservacion
        quantity: item.quantity, //numero de habitaciones
      })),
      back_urls: {
        success: "https://pf-eclipseroyale.onrender.com/success",
        failure: "https://pf-eclipseroyale.onrender.com/failure",
      },
      auto_return: 'approved',
    };

    try {
      const response = await preference.create({body: preferenceData });
      return { preferenceId: response.id }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}