import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
    constructor(private readonly reservationsRepository: ReservationsRepository) {}

    getReservations(){
        return this.reservationsRepository.getReservations()
    }
}
