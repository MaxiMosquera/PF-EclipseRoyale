import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateFeatureDto } from 'src/dtos/room.dtos';
import { FeatureRepository } from 'src/repositories/feature.repository';

@Controller('features')
export class FeatureController {
  constructor(private readonly featureRepository: FeatureRepository) {}

  @Post('createFeature')
  async createFeature(@Body() body: CreateFeatureDto) {
    return await this.featureRepository.createFeature(body);
  }

  @Put('updateFeature/:id') // feature id
  async updateFeature(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: Partial<CreateFeatureDto>,
  ) {
    return await this.featureRepository.updateFeature(id, body);
  }
}
