import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import {
  GetAllUsersResponseSchema,
  GetUserByIdResponseSchema,
} from 'src/dtos/responses.dtos/user.responses';
import { UpdateUserDto } from 'src/dtos/updateuser.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve a paginated list of users.',
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number for pagination',
    type: Number,
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of users per page',
    type: Number,
    required: false,
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully',
    schema: GetAllUsersResponseSchema,
  })
  @Get()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<User[]> {
    return await this.userRepository.getAllUsers(page, limit);
  }

  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'Retrieve a user by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the user to retrieve',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully',
    schema: GetUserByIdResponseSchema,
  })
  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.userRepository.getUserById(id);
  }

  @ApiOperation({
    summary: 'Update a user',
    description: 'Update the details of a specific user by their ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the user to update',
    type: String,
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Partial update data for the user',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: GetUserByIdResponseSchema,
  })
  @Put(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: Partial<UpdateUserDto>,
  ): Promise<User> {
    return await this.userRepository.updateUser(id, data);
  }

  @ApiOperation({
    summary: 'Delete a user',
    description: 'Delete a user by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the user to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    schema: {
      example: 'User deleted',
    },
  })
  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return await this.userRepository.deleteUser(id);
  }
}
