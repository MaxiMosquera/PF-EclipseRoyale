import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFeatureDto } from 'src/dtos/room.dtos';
import { Features } from 'src/entities/features.entity';
import { Room } from 'src/entities/room.entity';
import { Repository } from 'typeorm';
import { features } from 'src/utils/features';
import { rooms } from 'src/utils/rooms';
import { GuestPrice } from 'src/entities/guestPrice.entity';

@Injectable()
export class FeatureRepository implements OnModuleInit {
  constructor(
    @InjectRepository(Features)
    private readonly featureRepository: Repository<Features>,
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(GuestPrice)
    private readonly guestPriceRepository: Repository<GuestPrice>,
  ) {}

  async onModuleInit() {
    const price = await this.guestPriceRepository.findOneBy({ name: 'guest' });

    if (price) {
      return;
    }

    const guestPrice = new GuestPrice();
    guestPrice.name = 'guest';
    guestPrice.price = 15;
    await this.guestPriceRepository.save(guestPrice);

    for (const feature of features) {
      const exists = await this.featureRepository.findOneBy({
        name: feature.name,
      });

      if (!exists) {
        await this.featureRepository.save(feature);
      }
    }

    const firstRoom = rooms[0];

    const exist = await this.roomRepository.findOneBy({
      number: firstRoom.number,
    });

    if (exist) {
      return;
    }

    for (const roomData of rooms) {
      // Busca las features por nombre
      const foundFeatures: Features[] = [];
      for (const feature of roomData.features) {
        const foundFeature = await this.featureRepository.findOne({
          where: { name: feature.name },
        });
        if (feature.name === 'Vista al Mar') {
          console.log(feature.name);
        }
        if (foundFeature) {
          foundFeatures.push(foundFeature);
        } else {
          throw new BadRequestException('Feature not found');
        }
      }

      // Crea y guarda la room con sus features
      console.log(foundFeatures);
      let room = await this.roomRepository.findOne({
        where: { number: roomData.number },
      });

      if (!room) {
        // Si la habitación no existe, crea una nueva
        room = this.roomRepository.create({
          number: roomData.number,
          price: roomData.price,
          category: roomData.category,
          features: foundFeatures, // Usa `foundFeatures` directamente
        });
      } else {
        // Si la habitación existe, asegura que `features` esté inicializado
        if (!room.features) {
          room.features = [];
        }
        room.features.push(...foundFeatures); // Usa el operador de expansión
      }

      await this.roomRepository.save(room);
    }
  }

  async createFeature(body: CreateFeatureDto) {
    const exists = await this.featureRepository.findOneBy({ name: body.name });

    if (exists) {
      throw new BadRequestException('Feature already exists');
    }

    const feature = this.featureRepository.create({
      ...body,
    });

    await this.featureRepository.save(feature);

    if (!body.roomCategory) {
      return feature;
    }

    const roomWithCategory = await this.roomRepository.find({
      where: { category: body.roomCategory },
    });

    if (!roomWithCategory) {
      return feature;
    }

    roomWithCategory.forEach(async (room) => {
      room.features.push(feature);
      await this.roomRepository.save(room);
    });

    return feature;
  }

  async updateFeature(id: string, body: Partial<CreateFeatureDto>) {
    const feature = await this.featureRepository.findOne({
      where: { id },
    });

    if (!feature) {
      throw new NotFoundException('Feature not found');
    }

    return await this.featureRepository.save({
      ...feature,
      ...body,
    });
  }
}
