import {
  BadRequestException,
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
    const queryBuilder = this.roomRepository.createQueryBuilder('room');

    queryBuilder.leftJoinAndSelect('room.features', 'features');

    if (body) {
      const { category, minPrice, maxPrice } = body;

      if (category) {
        queryBuilder.andWhere('room.category = :category', { category });
      }

      if (minPrice !== undefined) {
        queryBuilder.andWhere('room.price >= :minPrice', { minPrice });
      }

      if (maxPrice !== undefined) {
        queryBuilder.andWhere('room.price <= :maxPrice', { maxPrice });
      }
    }

    // Paginación
    queryBuilder.skip((page - 1) * limit).take(limit);

    // Ejecuta la consulta y cuenta el total
    const [rooms, total] = await queryBuilder.getManyAndCount();

    return {
      data: rooms,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getRoomById(id: string) {
    const room = await this.roomRepository.findOne({
      where: {
        id,
      },
      relations: ['features'],
    });
    const availableServices = await this.serviceRepository.find({});

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
