import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateServiceDto } from 'src/dtos/service.dtos';
import { ServiceRepository } from 'src/repositories/services.repistory';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceRepository: ServiceRepository) {}

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
