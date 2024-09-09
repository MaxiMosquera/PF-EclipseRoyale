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
import { MonthlyProfit } from 'src/entities/monthlyProfit.entity';
import { ProfitDto } from 'src/dtos/profit.dto';
import { Reservation } from 'src/entities/reservation.entity';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

@Injectable()
export class ServiceRepository implements OnModuleInit {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(MonthlyProfit)
    private readonly monthlyProfitRepository: Repository<MonthlyProfit>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
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

  async getAllServices(): Promise<Service[]> {
    return await this.serviceRepository.find();
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

  async getMonthlyProfit(body: ProfitDto) {
    const monthlyProfit = await this.monthlyProfitRepository.findOneBy({
      month: body.month,
      year: body.year,
    });

    if (!monthlyProfit) {
      throw new NotFoundException('Monthly profit not found');
    }

    const reservationsOnThisMonth = await this.reservationRepository.find({
      where: {
        startDate: MoreThanOrEqual(new Date(body.year, body.month - 1, 1)),
        endDate: LessThanOrEqual(new Date(body.year, body.month, 0)),
      },
      relations: ['user', 'room'],
    });

    return { monthlyProfit, reservationsOnThisMonth };
  }
}
