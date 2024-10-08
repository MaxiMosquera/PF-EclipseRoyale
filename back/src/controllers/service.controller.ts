import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { createServiceApiResponse, getServiceByIdApiResponse, updateServiceByIdApiResponse } from 'src/dtos/responses.dtos/serviceResponses.dtos';
import { CreateServiceDto } from 'src/dtos/service.dtos';
import { Service } from 'src/entities/service.entity';
import { ServiceRepository } from 'src/repositories/services.repository';

@ApiTags('Services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  @ApiOperation({
    summary: 'Get a service by ID',
    description: 'Retrieve a specific service by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the service to retrieve',
    type: String,
  })
  @ApiResponse(getServiceByIdApiResponse)

  @Get(':id')
  async getServiceById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Service> {
    return await this.serviceRepository.getServiceById(id);
  }

  @ApiOperation({
    summary: 'Create a new service',
    description: 'Create a new service with the provided details.',
  })
  @ApiBody({
    type: CreateServiceDto,
  })
  @ApiResponse(createServiceApiResponse)
  @Post('createService')
  async createService(@Body() body: CreateServiceDto) {
    return await this.serviceRepository.createService(body);
  }

  @ApiOperation({
    summary: 'Update an existing service',
    description: 'Update the details of a specific service by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the service to update',
    type: String,
  })
  @ApiBody({
    type: CreateServiceDto,
    description: 'Partial service details to update',
  })
  @ApiResponse(updateServiceByIdApiResponse)
  @Put('updateService/:id')
  async updateService(
    @Param('id', ParseUUIDPipe) id:string,
    @Body() body: Partial<CreateServiceDto>,
  ) {
    return await this.serviceRepository.updateService(id, body);
  }
}
