import { Type } from 'src/enum/service.enums';
import { CreateServiceDto } from 'src/dtos/service.dtos';

export const services: CreateServiceDto[] = [
  {
    price: 50,
    type: Type.BREAKFAST,
  },
  {
    price: 100,
    type: Type.HOTELBAR,
  },
  {
    price: 200,
    type: Type.SPA,
  },
];
