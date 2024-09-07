import { Type } from 'src/enum/service.enums';
import { CreateServiceDto } from 'src/dtos/service.dtos';

export const services: CreateServiceDto[] = [
  {
    price: 15,
    name: Type.BREAKFAST,
  },
  {
    price: 20,
    name: Type.HOTELBAR,
  },
  {
    price: 50,
    name: Type.SPA,
  },
];
