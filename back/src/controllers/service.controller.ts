import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateServiceDto } from 'src/dtos/service.dtos';
import { Service } from 'src/entities/service.entity';
import { ServiceRepository } from 'src/repositories/services.repository';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  @Get(":id")
  async getServiceById(@Param('id', ParseUUIDPipe) id: string):Promise <Service> {
    return await this.serviceRepository.getServiceById(id);
  }
  @Post('createService')
  async createService(@Body() body: CreateServiceDto) {
    return await this.serviceRepository.createService(body);
  }

  @Put('updateService/:id') // service id
  async updateService(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: Partial<CreateServiceDto>,
  ) {
    return await this.serviceRepository.updateService(id, body);
  }
}
