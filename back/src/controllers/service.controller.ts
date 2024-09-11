import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { ProfitDto } from 'src/dtos/profit.dto';
import {
  createServiceApiResponse,
  getServiceByIdApiResponse,
  updateServiceByIdApiResponse,
} from 'src/dtos/responses.dtos/serviceResponses.dtos';
import { CreateServiceDto } from 'src/dtos/service.dtos';
import { Service } from 'src/entities/service.entity';
import { Role } from 'src/enum/user.enums';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGUard } from 'src/guards/auth.guard';
import { ServiceRepository } from 'src/repositories/services.repository';

@ApiTags('Services')
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  @Get('getAllServices')
  async getAllServices(): Promise<Service[]> {
    return await this.serviceRepository.getAllServices();
  }

  @Get('getServicePrices')
  async getServicePrices() {
    return await this.serviceRepository.getServicePrices();
  }

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
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(AuthGUard, AdminGuard)
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
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(AuthGUard, AdminGuard)
  @Put('updateService/:id')
  async updateService(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: Partial<CreateServiceDto>,
  ) {
    return await this.serviceRepository.updateService(id, body);
  }

  @ApiOperation({
    summary: 'Get monthly profit',
    description: 'Retrieve the monthly profit for a given month and year.',
  })
  @ApiBody({
    type: ProfitDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the monthly profit.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(AuthGUard, AdminGuard)
  @Post('getMonthlyProfit')
  async getMonthlyProfit(@Body() body: ProfitDto) {
    return await this.serviceRepository.getMonthlyProfit(body);
  }
}
