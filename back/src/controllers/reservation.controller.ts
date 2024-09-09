import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import {
  CreateReservationDto,
  GetReservationsFiltersDto,
} from 'src/dtos/reservation.dtos';
import { Role } from 'src/enum/user.enums';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGUard } from 'src/guards/auth.guard';
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
  @Get('getUserReservations/:email') // user email
  async getReservations(
    @Param('email') email: string,
    @Query() filters?: GetReservationsFiltersDto,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.reservationRepository.getReservations(
      email,
      filters,
      page,
      limit,
    );
  }

  @ApiOperation({
    summary: 'Get all reservations',
    description: 'Retrieve all reservations with optional filters.',
  })
  @Get('getAllReservations')
  async getReservationsAll(
    @Query() filters?: GetReservationsFiltersDto,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.reservationRepository.getAllReservations(
      filters,
      page,
      limit,
    );
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
    @Query() filters?: GetReservationsFiltersDto,
  ) {
    return await this.reservationRepository.getReservationsRoom(id, filters);
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
  @Post('create-reservation/:id') // user id
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
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(AuthGUard, AdminGuard)
  @Put('checkout/:id')
  async checkout(@Param('id', ParseUUIDPipe) id: string) {
    return await this.reservationRepository.checkout(id);
  }

  @ApiOperation({
    summary: 'Cancel a reservation',
    description:
      'Cancel a reservation by marking it as cancelled using its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the reservation to be cancelled',
    type: String,
  })
  @Put('cancel/:id')
  async cancel(@Param('id', ParseUUIDPipe) id: string) {
    return await this.reservationRepository.changeStatusToCancelled(id);
  }
}
