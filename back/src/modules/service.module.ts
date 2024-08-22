import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from 'src/controllers/service.controller';
import { Reservation } from 'src/entities/reservation.entity';
import { Service } from 'src/entities/service.entity';
import { ServiceRepository } from 'src/repositories/services.repistory';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Reservation])],
  controllers: [ServiceController],
  providers: [ServiceRepository],
})
export class ServiceModule {}
