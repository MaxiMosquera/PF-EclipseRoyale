import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateReservationDto,
  GetReservationsFiltersDto,
} from 'src/dtos/reservation.dtos';
import { ReservationRepository } from 'src/repositories/reservation.repository';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  @Get('getReservations/:id') // user id
  async getReservations(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body?: GetReservationsFiltersDto,
  ) {
    return await this.reservationRepository.getReservations(id, body);
  }

  @Get('getReservations')
  async getReservationsAll(@Body() body?: GetReservationsFiltersDto) {
    return await this.reservationRepository.getAllReservations(body);
  }

  @Get('getReservationsRoom/:id') // room id
  async getReservationsRoom(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body?: GetReservationsFiltersDto,
  ) {
    return await this.reservationRepository.getReservationsRoom(id, body);
  }

  @Post('createReservation/:id') // user id
  async checkin(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateReservationDto,
  ) {
    return await this.reservationRepository.checkin(id, body);
  }

  @Put('checkout/:id') // reservation id
  async checkout(@Param('id', ParseUUIDPipe) id: string) {
    return await this.reservationRepository.checkout(id);
  }
}
