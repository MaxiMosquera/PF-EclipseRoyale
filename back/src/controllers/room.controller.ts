import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateFeatureDto,
  CreateRoomDto,
  FilterRoomsDto,
  UpdateRoomDto,
} from 'src/dtos/room.dtos';
import {
  AddFeatureApiResponse,
  getAllRoomsApiResponse,
  GetAllRoomsResponseDto,
  getRoomByIdApiResponse,
} from 'src/dtos/responses.dtos/roomResponses.dtos';
import { RoomRepository } from 'src/repositories/room.repository';
import { Room } from 'src/entities/room.entity';

@ApiTags('Rooms')
@Controller('room')
export class RoomController {
  constructor(private readonly roomRepository: RoomRepository) {}

  @ApiOperation({
    summary: 'Get all rooms with optional filters',
    description:
      'Retrieve a paginated list of rooms with optional filters such as category, price range, and date range.',
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number for pagination',
    required: false,
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of rooms per page',
    required: false,
    type: Number,
    example: 10,
  })
  @ApiBody({
    type: FilterRoomsDto,
    required: false,
    description: 'Filters to apply when retrieving rooms',
  })
  @ApiResponse(getAllRoomsApiResponse)
  @Get('getAllRooms')
  async getAllRooms(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Body() body?: FilterRoomsDto,
  ): Promise<GetAllRoomsResponseDto> {
    return await this.roomRepository.getAllRooms(page, limit, body);
  }

  @ApiOperation({
    summary: 'Get room by ID',
    description:
      'Retrieve a specific room by its ID, including available services.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the room to retrieve',
    type: String,
  })
  @ApiResponse(getRoomByIdApiResponse)
  @Get('getRoomById/:id')
  async getRoomById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.roomRepository.getRoomById(id);
  }

  @ApiOperation({
    summary: 'Update room details',
    description: 'Update the details of a specific room by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the room to update',
    type: String,
  })
  @ApiBody({
    type: UpdateRoomDto,
  })
  @ApiResponse(getRoomByIdApiResponse)
  @Put('updateRoom/:id')
  async updateRoom(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateRoomDto,
  ): Promise<Room> {
    return await this.roomRepository.updateRoom(id, body);
  }

  @ApiOperation({
    summary: 'Create a new room',
    description: 'Create a new room with the provided details.',
  })
  @ApiBody({
    type: CreateRoomDto,
  })
  @ApiResponse(getRoomByIdApiResponse)
  @Post('createRoom')
  async createRoom(@Body() body: CreateRoomDto) {
    return await this.roomRepository.createRoom(body);
  }

  @ApiOperation({
    summary: 'Add features to a room',
    description: 'Add specific features to a room by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the room to add features to',
    type: String,
  })
  @ApiBody({
    type: CreateFeatureDto,
  })
  @ApiResponse(AddFeatureApiResponse)
  @Put('addFeatures/:id')
  async addFeatures(@Param('id', ParseUUIDPipe) id: string, @Body() body: any) {
    return await this.roomRepository.addFeatures(id, body.featureId);
  }
}
