import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  CreateReservationDto,
  GetReservationsFiltersDto,
} from 'src/dtos/reservation.dtos';
import { ReservationRepository } from 'src/repositories/reservation.repository';

@ApiTags('Reservations')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  @ApiOperation({
    summary: 'Get reservations for a specific user',
    description:
      'Retrieve reservations for a user by their ID, with optional filters.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the user whose reservations are to be fetched',
    type: String,
  })
  @Get('getReservations/:id')
  async getReservations(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body?: GetReservationsFiltersDto,
  ) {
    return await this.reservationRepository.getReservations(id, body);
  }

  @ApiOperation({
    summary: 'Get all reservations',
    description: 'Retrieve all reservations with optional filters.',
  })
  @Get('getReservations')
  async getReservationsAll(@Body() body?: GetReservationsFiltersDto) {
    return await this.reservationRepository.getAllReservations(body);
  }

  @ApiOperation({
    summary: 'Get reservations for a specific room',
    description:
      'Retrieve reservations for a room by its ID, with optional filters.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the room whose reservations are to be fetched',
    type: String,
  })
  @Get('getReservationsRoom/:id')
  async getReservationsRoom(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body?: GetReservationsFiltersDto,
  ) {
    return await this.reservationRepository.getReservationsRoom(id, body);
  }

  @ApiOperation({
    summary: 'Create a new reservation for a user',
    description:
      'Create a reservation for a user by their ID. The reservation details must be provided in the request body.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the user for whom the reservation is to be created',
    type: String,
  })
  @Post('createReservation/:id')
  async checkin(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateReservationDto,
  ) {
    return await this.reservationRepository.checkin(id, body);
  }

  @ApiOperation({
    summary: 'Checkout and finalize a reservation',
    description:
      'Finalize a reservation by marking it as finished using its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the reservation to be checked out',
    type: String,
  })
  @Put('checkout/:id')
  async checkout(@Param('id', ParseUUIDPipe) id: string) {
    return await this.reservationRepository.checkout(id);
  }
}
