import { Controller, Get } from '@nestjs/common';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService){}

    @Get()
    getReservations(){
        return this.reservationsService.getReservations()
    }
}
