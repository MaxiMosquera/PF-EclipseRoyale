import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateFeatureDto } from 'src/dtos/room.dtos';
import { FeatureRepository } from 'src/repositories/feature.repository';

@ApiTags('Features')
@Controller('features')
export class FeatureController {
  constructor(private readonly featureRepository: FeatureRepository) {}

  @ApiOperation({ summary: 'Create a new feature' })
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
  @Put('updateFeature/:id')
  async updateFeature(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: Partial<CreateFeatureDto>,
  ) {
    return await this.featureRepository.updateFeature(id, body);
  }
}
