import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureController } from 'src/controllers/feature.controller';
import { Features } from 'src/entities/features.entity';
import { Room } from 'src/entities/room.entity';
import { FeatureRepository } from 'src/repositories/feature.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Features, Room])],
  controllers: [FeatureController],
  providers: [FeatureRepository],
})
export class FeatureModule {}
