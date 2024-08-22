import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from 'src/controllers/room.controller';
import { Features } from 'src/entities/features.entity';
import { Reservation } from 'src/entities/reservation.entity';
import { Room } from 'src/entities/room.entity';
import { Service } from 'src/entities/service.entity';
import { RoomRepository } from 'src/repositories/room.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Reservation, Features, Service])],
  controllers: [RoomController],
  providers: [RoomRepository],
})
export class RoomModule {}
