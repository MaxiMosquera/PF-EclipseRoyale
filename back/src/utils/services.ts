import { Type } from 'src/enum/service.enums';
import { CreateServiceDto } from 'src/dtos/service.dtos';

export const services: CreateServiceDto[] = [
  {
    price: 50,
    name: Type.BREAKFAST,
  },
  {
    price: 100,
    name: Type.HOTELBAR,
  },
  {
    price: 200,
    name: Type.SPA,
  },
];
