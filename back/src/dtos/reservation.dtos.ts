import { Type } from 'src/enum/service.enums';

export class CreateReservationDto {
  roomId: string;
  services?: [Type];
  /////
  startDay: number;
  startMonth: number;
  startYear: number;
  endDay: number;
  endMonth: number;
  endYear: number;
  /////
  guestName1?: string;
  guestLastName1?: string;
  guestName2?: string;
  guestLastName2?: string;
  guestName3?: string;
  guestLastName3?: string;
}

export class GetReservationsFiltersDto {
  status?: string;
  startDay?: number;
  startMonth?: number;
  startYear?: number;
  endDay?: number;
  endMonth?: number;
  endYear?: number;
}
