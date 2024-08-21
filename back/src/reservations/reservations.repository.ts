import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationsRepository {

    getReservations(){
        return "Proximamente listado de reservas"
    }
}