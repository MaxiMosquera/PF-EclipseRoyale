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
  UpdateRoomDto,
} from 'src/dtos/room.dtos';
import { Features } from 'src/entities/features.entity';
import { Room } from 'src/entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomRepository {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(Features)
    private readonly featuresRepository: Repository<Features>,
  ) {}

  async getAllRooms(page: number, limit: number): Promise<any> {
    const [rooms, total] = await this.roomRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['features'],
    });

    return {
      data: rooms,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getRoomById(id: string) {
    return await this.roomRepository.findOne({
      where: {
        id,
      },
      relations: ['features'],
    });
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
