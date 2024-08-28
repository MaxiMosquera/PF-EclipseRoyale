import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateFeatureDto,
  CreateRoomDto,
  FilterRoomsDto,
  UpdateRoomDto,
} from 'src/dtos/room.dtos';
import { Features } from 'src/entities/features.entity';
import { Room } from 'src/entities/room.entity';
import { Service } from 'src/entities/service.entity';
import { Category } from 'src/enum/room.enums';
import { roomImages } from 'src/utils/roomsimages';
import { Repository } from 'typeorm';

@Injectable()
export class RoomRepository {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(Features)
    private readonly featuresRepository: Repository<Features>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async getAllRooms(
    page: number,
    limit: number,
    filters?: FilterRoomsDto,
  ): Promise<any> {
    if (page <= 0) {
      throw new ConflictException('Page number must be greater than 0.');
    }

    if (limit <= 0) {
      throw new ConflictException('Limit must be greater than 0.');
    }

    // Calcular el offset para la paginación
    const offset = (page - 1) * limit;

    // Inicializar las condiciones de búsqueda
    const conditions: any = [];
    const parameters: any = {};

    if (filters) {
      const { minPrice, maxPrice, startingDate, endingDate, category } =
        filters;

      // Convertir el valor de category a número
      const categoryNumber = category ? Number(category) : undefined;

      if (categoryNumber) {
        switch (categoryNumber) {
          case 1:
          case 2:
            conditions.push(
              '(room.category = :suite OR room.category = :suitePremium)',
            );
            parameters['suite'] = Category.SUITE;
            parameters['suitePremium'] = Category.SUITE_PREMIUM;
            break;
          case 3:
          case 4:
            conditions.push(
              '(room.category = :loft OR room.category = :loftPremium)',
            );
            parameters['loft'] = Category.LOFT;
            parameters['loftPremium'] = Category.LOFT_PREMIUM;
            break;
          default:
            throw new ConflictException('Invalid category value.');
        }
      }

      const minPriceNumber =
        minPrice !== undefined ? Number(minPrice) : undefined;
      const maxPriceNumber =
        maxPrice !== undefined ? Number(maxPrice) : undefined;

      if (minPriceNumber !== undefined) {
        if (minPriceNumber < 0) {
          throw new ConflictException('minPriceNumber cannot be negative.');
        }
        conditions.push('room.price >= :minPriceNumber');
        parameters['minPriceNumber'] = minPriceNumber;
      }

      if (maxPriceNumber !== undefined) {
        if (maxPriceNumber < 0) {
          throw new ConflictException('maxPriceNumber cannot be negative.');
        }
        conditions.push('room.price <= :maxPriceNumber');
        parameters['maxPriceNumber'] = maxPriceNumber;
      }

      if (
        minPriceNumber !== undefined &&
        maxPriceNumber !== undefined &&
        minPriceNumber > maxPriceNumber
      ) {
        throw new ConflictException(
          'minPriceNumber cannot be greater than maxPriceNumber.',
        );
      }

      const hasStartDate = startingDate !== undefined;
      const hasEndDate = endingDate !== undefined;

      if (hasStartDate && hasEndDate) {
        const startDate = new Date(startingDate);
        const endDate = new Date(endingDate);

        if (startDate > endDate) {
          throw new ConflictException('Start date cannot be after end date.');
        }

        // Usar una subconsulta para encontrar habitaciones ocupadas en el rango de fechas
        const occupiedRooms = await this.roomRepository
          .createQueryBuilder('room')
          .leftJoin('room.reservations', 'reservation')
          .where(
            'reservation.startDate <= :endDate AND reservation.endDate >= :startDate',
            { startDate, endDate },
          )
          .select('room.id')
          .getRawMany();

        const occupiedRoomIds = occupiedRooms.map((row) => row.room_id);

        // Excluir habitaciones ocupadas
        if (occupiedRoomIds.length > 0) {
          conditions.push('room.id NOT IN (:...occupiedRoomIds)');
          parameters['occupiedRoomIds'] = occupiedRoomIds;
        }
      } else if (hasStartDate || hasEndDate) {
        throw new ConflictException(
          'Both start date and end date must be provided.',
        );
      }
    }

    // Consultar habitaciones según las condiciones
    const [rooms, total] = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.features', 'features')
      .leftJoinAndSelect('room.reservations', 'reservations')
      .where(conditions.length ? conditions.join(' AND ') : '1=1', parameters)
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return {
      data: rooms,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      message:
        total === 0 ? 'No rooms found matching the criteria.' : undefined,
    };
  }

  // async getAllRooms() {
  //   return await this.roomRepository.find({
  //     relations: ['features'],
  //   });
  // }

  async getRoomById(id: string) {
    const room = await this.roomRepository.findOne({
      where: {
        id,
      },
      relations: ['features'],
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }

    const availableServices = await this.serviceRepository.find({});

    // Añadir las imágenes correspondientes a la categoría
    if (roomImages[room.category as Category]) {
      room.images = roomImages[room.category as Category];
    } else {
      room.images = []; // O manejar el caso donde no haya imágenes
    }

    return [room, availableServices];
  }

  async updateRoom(id: string, body: UpdateRoomDto) {
    const room = await this.roomRepository.findOneBy({ id });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return await this.roomRepository.save({ ...room, ...body });
  }

  async createRoom(body: CreateRoomDto) {
    const exitsRoom = await this.roomRepository.findOne({
      where: { number: body.number },
    });

    if (exitsRoom) {
      throw new Error(
        'Room already exists, try another number or use Put method to update it',
      );
    }

    const room = this.roomRepository.create({
      ...body,
    });

    return await this.roomRepository.save(room);
  }

  // add features

  async addFeatures(id: string, featureId: string) {
    const room = await this.roomRepository.findOneBy({ id });

    if (!room) {
      throw new BadRequestException('Room not found');
    }

    const feature = await this.featuresRepository.findOneBy({ id: featureId });
    if (!feature) {
      throw new BadRequestException('Feature not found');
    }

    room.features = [...room.features, feature];
    return await this.roomRepository.save(room);
  }

  async deleteRoom(id: string) {
    const room = await this.roomRepository.findOneBy({ id });
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return await this.roomRepository.remove(room);
  }
}
