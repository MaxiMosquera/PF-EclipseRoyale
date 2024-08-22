import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateFeatureDto,
  CreateRoomDto,
  UpdateRoomDto,
} from 'src/dtos/room.dtos';
import { RoomRepository } from 'src/repositories/room.repository';

@Controller('room')
export class RoomController {
  constructor(private readonly roomRepository: RoomRepository) {}

  @Get('getAllRooms')
  async getAllRooms(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.roomRepository.getAllRooms(page, limit);
  }

  @Get('getRoomById/:id')
  async getRoomById(@Query('id', ParseUUIDPipe) id: string) {
    return await this.roomRepository.getRoomById(id);
  }

  @Put('updateRoom/:id')
  async updateRoom(
    @Query('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateRoomDto,
  ) {
    return await this.roomRepository.updateRoom(id, body);
  }

  @Post('createRoom')
  async createRoom(@Body() body: CreateRoomDto) {
    return await this.roomRepository.createRoom(body);
  }

  @Put('addFeatures/:id') // room id
  async addFeatures(@Query('id', ParseUUIDPipe) id: string, @Body() body: any) {
    return await this.roomRepository.addFeatures(id, body.featureId);
  }
}
