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
    body?: FilterRoomsDto,
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

    if (body) {
      const {
        category,
        minPrice,
        maxPrice,
        startDay,
        startMonth,
        startYear,
        endDay,
        endMonth,
        endYear,
      } = body;

      if (category) {
        conditions.push('room.category = :category');
        parameters['category'] = category;
      }

      if (minPrice !== undefined) {
        if (minPrice < 0) {
          throw new ConflictException('MinPrice cannot be negative.');
        }
        conditions.push('room.price >= :minPrice');
        parameters['minPrice'] = minPrice;
      }

      if (maxPrice !== undefined) {
        if (maxPrice < 0) {
          throw new ConflictException('MaxPrice cannot be negative.');
        }
        conditions.push('room.price <= :maxPrice');
        parameters['maxPrice'] = maxPrice;
      }

      if (
        minPrice !== undefined &&
        maxPrice !== undefined &&
        minPrice > maxPrice
      ) {
        throw new ConflictException(
          'MinPrice cannot be greater than MaxPrice.',
        );
      }

      const hasStartDate =
        startDay !== undefined &&
        startMonth !== undefined &&
        startYear !== undefined;
      const hasEndDate =
        endDay !== undefined && endMonth !== undefined && endYear !== undefined;

      if (hasStartDate && hasEndDate) {
        const startDate = new Date(startYear, startMonth - 1, startDay);
        const endDate = new Date(endYear, endMonth - 1, endDay);

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
    room.images = roomImages[room.category as Category];

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
