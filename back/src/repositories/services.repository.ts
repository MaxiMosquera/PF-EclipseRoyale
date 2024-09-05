import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateServiceDto } from 'src/dtos/service.dtos';
import { Service } from 'src/entities/service.entity';
import { Repository } from 'typeorm';
import { services } from 'src/utils/services';

@Injectable()
export class ServiceRepository implements OnModuleInit {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async onModuleInit() {
    for (const service of services) {
      const exists = await this.serviceRepository.findOneBy({
        name: service.name,
      });
      if (!exists) {
        const newService = await this.serviceRepository.create({
          ...service,
        });

        await this.serviceRepository.save(newService);
      }
    }
  }

  async createService(body: CreateServiceDto) {
    const exists = await this.serviceRepository.findOneBy({
      name: body.name,
    });

    if (exists) {
      throw new BadRequestException(
        'Service already exists for this reservation',
      );
    }

    const service = this.serviceRepository.create({
      ...body,
    });

    return await this.serviceRepository.save(service);
  }

  async updateService(id: string, body: Partial<CreateServiceDto>) {
    const service = await this.serviceRepository.findOne({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return await this.serviceRepository.save({
      ...service,
      ...body,
    });
  }

  async getServiceById(id: string): Promise<Service> {
    const service = await this.serviceRepository.findOneBy({ id });
    if (!service) {
      throw new NotFoundException('Service not found');
    } else {
      return service;
    }
  }
}
