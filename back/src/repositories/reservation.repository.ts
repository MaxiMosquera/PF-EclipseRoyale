import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateReservationDto,
  GetReservationsFiltersDto,
} from 'src/dtos/reservation.dtos';
import { GuestPrice } from 'src/entities/guestPrice.entity';
import { MonthlyProfit } from 'src/entities/monthlyProfit.entity';
import { Reservation } from 'src/entities/reservation.entity';
import { Room } from 'src/entities/room.entity';
import { ReservationService } from 'src/entities/s-r.entity';
import { Service } from 'src/entities/service.entity';
import { User } from 'src/entities/user.entity';
import { ReservationStatus } from 'src/enum/reservationStatus.enums';
import { Type } from 'src/enum/service.enums';
import { MailService } from 'src/services/mail.service';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

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
    @InjectRepository(GuestPrice)
    private readonly guestPriceRepository: Repository<GuestPrice>,
    private readonly emailService: MailService,
  ) {}

  async getReservations(id: string, body?: GetReservationsFiltersDto) {
    const hasStartDate = body?.startDate;
    const hasEndDate = body?.endDate;
    const hasStatus = body?.status;

    if (
      (body?.startDate && !body?.endDate) ||
      (!body?.startDate && body?.endDate)
    ) {
      throw new ConflictException('Incomplete date information provided.');
    }

    if (hasStartDate || hasEndDate || hasStatus) {
      const query = this.reservationRepository
        .createQueryBuilder('reservation')
        .where('reservation.user = :id', { id });

      if (hasStartDate && hasEndDate) {
        const startDate = new Date(body.startDate);
        const endDate = new Date(body.endDate);

        if (startDate > endDate) {
          throw new ConflictException(
            'Start date cannot be later than end date.',
          );
        }

        query.andWhere(
          'reservation.startDate <= :endDate AND reservation.endDate >= :startDate',
          { startDate, endDate },
        );
      }

      if (hasStatus) {
        query.andWhere('reservation.status = :status', { status: body.status });
      }

      const reservations = await query.getMany();
      return reservations;
    }

    if (!body.endDate && !body.startDate && !body.status) {
      const reservations = await this.reservationRepository.find({
        where: { user: { id } },
      });
      return reservations;
    } else if (body.status && !hasStartDate && !hasEndDate) {
      const reservations = await this.reservationRepository.find({
        where: { user: { id }, status: body.status },
      });
      return reservations;
    }
  }

  async getAllReservations(
    filters?: GetReservationsFiltersDto,
    page?: number,
    limit?: number,
  ): Promise<any> {
    // Calcular el offset para la paginación
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

    // Filtro por fecha
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

    // Filtro por estado
    if (hasStatus) {
      query = query.andWhere('reservation.status = :status', {
        status: filters.status,
      });
    }

    // Aplicar paginación si los parámetros están presentes
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

    if (body.services) {
      body.services = body.services.map((service) => {
        const lowerCaseService = service.toLowerCase(); // Convertir a minúsculas
        const enumValue = Object.values(Type).find(
          (value) => value === lowerCaseService,
        );

        if (!enumValue) {
          throw new ConflictException(`Invalid service type: ${service}`);
        }
        return enumValue as Type;
      });
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

    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);

    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (days <= 0) {
      throw new ConflictException('Invalid date range');
    } else if (days > 15) {
      throw new ConflictException('Maximum 15 days');
    }

    const actuallyActiveReservation = await this.reservationRepository.findOne({
      where: { user: user, status: ReservationStatus.IN_PROGRESS },
    });

    if (actuallyActiveReservation) {
      throw new ConflictException('You already have an active reservation');
    }

    const overlappingReservation = await this.reservationRepository.findOne({
      where: [
        {
          room: { id: body.roomId },
          startDate: LessThanOrEqual(endDate),
          endDate: MoreThanOrEqual(startDate),
        },
      ],
    });

    if (overlappingReservation) {
      throw new ConflictException(
        'There is already a reservation during these dates for this room.',
      );
    }

    let totalPrice: number = room.price * days;

    // Crear la reserva
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
      user,
      room,
    });
    await this.reservationRepository.save(reservation);

    for (const serviceType of body.services) {
      const serviceEntity = await this.serviceRepository.findOne({
        where: { type: serviceType },
      });

      if (!serviceEntity) {
        throw new NotFoundException(`Service of type ${serviceType} not found`);
      }

      totalPrice += serviceEntity.price;

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

    //agregar email reserva
    await this.emailService.sendReservationemail(user.email, user.name);

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
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    if (reservation.status === 'completed') {
      throw new ConflictException('Reservation already finished');
    }

    reservation.status = ReservationStatus.PAID;
    await this.reservationRepository.save(reservation);

    return reservation;
  }
}
