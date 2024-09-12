import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateReservationDto,
  GetReservationsFiltersDto,
} from 'src/dtos/reservation.dtos';
import { MonthlyProfit } from 'src/entities/monthlyProfit.entity';
import { Reservation } from 'src/entities/reservation.entity';
import { Room } from 'src/entities/room.entity';
import { ReservationService } from 'src/entities/s-r.entity';
import { Service } from 'src/entities/service.entity';
import { User } from 'src/entities/user.entity';
import { ReservationStatus } from 'src/enum/reservationStatus.enums';
import { MailService } from 'src/services/mail.service';
import * as moment from 'moment-timezone';
import {
  Equal,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(MonthlyProfit)
    private readonly monthlyProfitRepository: Repository<MonthlyProfit>,
    @InjectRepository(ReservationService)
    private readonly reservationServiceRepository: Repository<ReservationService>,
    private readonly emailService: MailService,
  ) {}

  @Cron('0 8 * * *')
  async handleCronMorning() {
    await this.updateReservationToInProgress();
  }

  @Cron('0 23 * * *')
  async handleCronNight() {
    await this.updateReservationToFinished();
  }

  @Cron('*/15 * * * *')
  async releaseUnpaidReservations(): Promise<void> {
    const fifteenMinutesAgo = moment()
      .tz('America/Argentina/Buenos_Aires')
      .subtract(15, 'minutes')
      .startOf('minute')
      .toDate();

    const unpaidReservations = await this.reservationRepository.find({
      where: {
        status: ReservationStatus.PENDING,
        createdAt: LessThan(fifteenMinutesAgo),
      },
    });

    unpaidReservations.forEach(async (reservation) => {
      reservation.status = ReservationStatus.CANCELED;
      await this.reservationRepository.save(reservation);
    });
  }

  @Cron('0 0 * * 4')
  async handleCron() {
    const users = await this.userRepository.find();
    console.log('funciono');

    for (const user of users) {
      await this.emailService.sendHotelUpdates(user);
    }
  }

  async updateReservationToInProgress(): Promise<void> {
    const localTimezone = 'America/Argentina/Buenos_Aires';
    const today = moment().tz(localTimezone).startOf('day').toDate();

    const reservationsToStart = await this.reservationRepository.find({
      where: {
        startDate: Equal(today),
        status: ReservationStatus.PENDING,
      },
    });

    for (const reservation of reservationsToStart) {
      reservation.status = ReservationStatus.IN_PROGRESS;
      await this.reservationRepository.save(reservation);
    }
  }

  async updateReservationToFinished(): Promise<void> {
    const localTimezone = 'America/Argentina/Buenos_Aires';
    const today = moment().tz(localTimezone).startOf('day').toDate();

    const reservationsToComplete = await this.reservationRepository.find({
      where: {
        endDate: Equal(today),
        status: ReservationStatus.IN_PROGRESS,
      },
    });

    for (const reservation of reservationsToComplete) {
      reservation.status = ReservationStatus.COMPLETED;
      await this.reservationRepository.save(reservation);
    }
  }
  async getReservations(
    email: string,
    body?: GetReservationsFiltersDto,
    page?: number,
    limit?: number,
  ): Promise<any> {
    const hasStartDate = body?.startDate;
    const hasEndDate = body?.endDate;
    const hasStatus = body?.status;

    if ((hasStartDate && !hasEndDate) || (!hasStartDate && hasEndDate)) {
      throw new ConflictException('Incomplete date information provided.');
    }

    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let query = this.reservationRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.room', 'room')
      .where('reservation.user = :id', { id: user.id });

    if (hasStartDate && hasEndDate) {
      const startDate = new Date(body.startDate);
      const endDate = new Date(body.endDate);

      if (startDate > endDate) {
        throw new ConflictException(
          'Start date cannot be later than end date.',
        );
      }

      query = query.andWhere(
        'reservation.startDate <= :endDate AND reservation.endDate >= :startDate',
        { startDate, endDate },
      );
    }

    if (hasStatus) {
      query = query.andWhere('reservation.status = :status', {
        status: body.status,
      });
    }

    const offset = page && limit ? (page - 1) * limit : undefined;

    if (offset !== undefined && limit !== undefined) {
      query = query.skip(offset).take(limit);
    }

    const [reservations, total] = await query.getManyAndCount();

    return {
      data: reservations,
      total,
      currentPage: page || 1,
      totalPages: limit ? Math.ceil(total / limit) : 1,
    };
  }

  async getAllReservations(
    filters?: GetReservationsFiltersDto,
    page?: number,
    limit?: number,
  ): Promise<any> {
    const offset = page && limit ? (page - 1) * limit : undefined;

    const hasStartDate = filters?.startDate;
    const hasEndDate = filters?.endDate;
    const hasStatus = filters?.status;

    if (
      (filters?.startDate && !filters?.endDate) ||
      (!filters?.startDate && filters?.endDate)
    ) {
      throw new ConflictException('Incomplete date information provided.');
    }

    let query = this.reservationRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.user', 'user')
      .leftJoinAndSelect('reservation.room', 'room');

    if (hasStartDate || hasEndDate) {
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);

      if (startDate > endDate) {
        throw new ConflictException(
          'Start date cannot be later than end date.',
        );
      }

      query = query.where(
        'reservation.startDate < :endDate AND reservation.endDate > :startDate',
        { startDate, endDate },
      );
    }

    if (hasStatus) {
      query = query.andWhere('reservation.status = :status', {
        status: filters.status,
      });
    }

    if (offset !== undefined && limit !== undefined) {
      query = query.skip(offset).take(limit);
    }

    const [reservations, total] = await query.getManyAndCount();

    return {
      data: reservations,
      total,
      currentPage: page || 1,
      totalPages: limit ? Math.ceil(total / limit) : 1,
    };
  }

  async getReservationsRoom(id: string, filters?: GetReservationsFiltersDto) {
    const hasStartDate = filters?.startDate;
    const hasEndDate = filters?.endDate;
    const hasStatus = filters?.status;

    if (
      (filters?.startDate && !filters?.endDate) ||
      (!filters?.startDate && filters?.endDate)
    ) {
      throw new ConflictException('Incomplete date information provided.');
    }

    if (hasStartDate || hasEndDate || hasStatus) {
      const query = this.reservationRepository
        .createQueryBuilder('reservation')
        .leftJoinAndSelect('reservation.user', 'user')
        .leftJoinAndSelect('reservation.room', 'room')
        .where('reservation.room.id = :id', { id });

      if (hasStartDate && hasEndDate) {
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);

        if (startDate > endDate) {
          throw new ConflictException(
            'Start date cannot be later than end date.',
          );
        }

        query.andWhere(
          'reservation.startDate < :endDate AND reservation.endDate > :startDate',
          { startDate, endDate },
        );
      }

      if (hasStatus) {
        query.andWhere('reservation.status = :status', {
          status: filters.status,
        });
      }

      const reservations = await query.getMany();
      return reservations;
    } else {
      if (!filters.endDate && !filters.startDate && !filters.status) {
        const reservations = await this.reservationRepository
          .createQueryBuilder('reservation')
          .leftJoinAndSelect('reservation.user', 'user')
          .leftJoinAndSelect('reservation.room', 'room')
          .where('reservation.room.id = :id', { id })
          .getMany();
        return reservations;
      } else if (filters.status) {
        const reservations = await this.reservationRepository
          .createQueryBuilder('reservation')
          .leftJoinAndSelect('reservation.user', 'user')
          .leftJoinAndSelect('reservation.room', 'room')
          .where('reservation.room.id = :id', { id })
          .andWhere('reservation.status = :status', { status: filters.status })
          .getMany();
        return reservations;
      }
    }
  }

  async checkin(id: string, body: CreateReservationDto) {
    const isInvalidDate =
      !body.startDate || !body.endDate || (body.startDate && !body.endDate);

    if (isInvalidDate) {
      throw new ConflictException('Invalid date');
    }

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const room = await this.roomRepository.findOne({
      where: { id: body.roomId },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const localTimezone = 'America/Argentina/Buenos_Aires'; // Ajusta esto a tu zona horaria local
    const startDate = moment.tz(body.startDate, localTimezone).toDate();
    const endDate = moment.tz(body.endDate, localTimezone).toDate();

    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (days <= 0) {
      throw new ConflictException('Invalid date range');
    }

    console.log(room);

    const overlappingReservations = await this.reservationRepository.find({
      where: {
        room: { id: room.id },
        status: In([ReservationStatus.PENDING, ReservationStatus.PAID]),
        startDate: LessThanOrEqual(body.endDate),
        endDate: MoreThanOrEqual(body.startDate),
      },
    });

    console.log(overlappingReservations);

    if (overlappingReservations.length > 0) {
      throw new ConflictException(
        'The room is already reserved for the selected dates',
      );
    }

    const actuallyActiveReservation = await this.reservationRepository.findOne({
      where: { user: user, status: ReservationStatus.IN_PROGRESS },
    });

    if (actuallyActiveReservation) {
      throw new ConflictException('You already have an active reservation');
    }

    let totalPrice: number = room.price * days;

    const now = moment().tz('America/Argentina/Buenos_Aires');
    const createdAt = new Date(
      now.year(),
      now.month(),
      now.date(),
      now.hour(),
      now.minute(),
      0,
      0,
    );

    const reservation = this.reservationRepository.create({
      price: totalPrice,
      startDate,
      endDate,
      guestName1: body.guestName1,
      guestLastName1: body.guestLastName1,
      guestName2: body.guestName2,
      guestLastName2: body.guestLastName2,
      guestName3: body.guestName3,
      guestLastName3: body.guestLastName3,
      createdAt: createdAt,
      user,
      room,
    });
    await this.reservationRepository.save(reservation);

    for (const serviceType of body.services) {
      const serviceEntity = await this.serviceRepository.findOne({
        where: { name: serviceType },
      });

      if (!serviceEntity) {
        throw new NotFoundException(`Service of type ${serviceType} not found`);
      }

      totalPrice += serviceEntity.price * days;

      const reservationService = this.reservationServiceRepository.create({
        reservation,
        service: serviceEntity,
        price: serviceEntity.price,
      });

      await this.reservationServiceRepository.save(reservationService);
    }

    const monthlyProfit = await this.monthlyProfitRepository.findOne({
      where: { year: startDate.getFullYear(), month: startDate.getMonth() + 1 },
    });

    if (!monthlyProfit) {
      await this.monthlyProfitRepository.save({
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        profit: totalPrice,
      });
    } else {
      monthlyProfit.profit += totalPrice;
      await this.monthlyProfitRepository.save(monthlyProfit);
    }
    reservation.price = totalPrice;
    await this.reservationRepository.save(reservation);

    return reservation;
  }

  async checkout(id: string) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    if (reservation.status === 'completed') {
      throw new ConflictException('Reservation already finished');
    }

    reservation.status = ReservationStatus.COMPLETED;
    await this.reservationRepository.save(reservation);

    return reservation;
  }

  async changestatusToPaid(id: string) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['room', 'user', 'reservationServices'],
    });

    const services: Service[] = [];

    for (const reservationService of reservation.reservationServices) {
      const reservationServiceEntity =
        await this.reservationServiceRepository.findOne({
          where: { id: reservationService.id },
          relations: ['service'],
        });

      const service = await this.serviceRepository.findOne({
        where: { id: reservationServiceEntity.service.id },
      });

      if (!service) {
        throw new NotFoundException('Service not found');
      }

      services.push(service);
    }

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    if (reservation.status === 'completed') {
      throw new ConflictException('Reservation already finished');
    }

    reservation.status = ReservationStatus.PAID;
    await this.reservationRepository.save(reservation);

    return { reservation, services };
  }

  async changeStatusToCancelled(id: string) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    if (reservation.status === 'completed') {
      throw new ConflictException('Reservation already finished');
    }

    reservation.status = ReservationStatus.CANCELED;
    await this.reservationRepository.save(reservation);

    return reservation;
  }
}
