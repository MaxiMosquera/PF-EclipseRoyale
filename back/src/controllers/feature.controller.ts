import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiResponseOptions,
} from '@nestjs/swagger';
import {
  CreateFeatureApiResponse,
  UpdateFeatureApiResponse,
} from 'src/dtos/responses.dtos/roomResponses.dtos';
import { CreateFeatureDto } from 'src/dtos/room.dtos';
import { FeatureRepository } from 'src/repositories/feature.repository';

@ApiTags('Features')
@Controller('features')
export class FeatureController {
  constructor(private readonly featureRepository: FeatureRepository) {}

  @Get('getAllFeatures')
  async getAllFeatures() {
    return await this.featureRepository.getAllFeatures();
  }

  @ApiOperation({ summary: 'Create a new feature' })
  @ApiResponse(CreateFeatureApiResponse)
  @Post('createFeature')
  async createFeature(@Body() body: CreateFeatureDto) {
    return await this.featureRepository.createFeature(body);
  }

  @ApiOperation({ summary: 'Update an existing feature' })
  @ApiParam({
    name: 'id',
    description: 'UUID of the feature to update',
    type: String,
  })
  @ApiResponse(UpdateFeatureApiResponse)
  @Put('updateFeature/:id')
  async updateFeature(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: Partial<CreateFeatureDto>,
  ) {
    return await this.featureRepository.updateFeature(id, body);
  }
}
