import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import {
  GetAllUsersResponseSchema,
  GetUserByIdResponseSchema,
} from 'src/dtos/responses.dtos/user.responses';
import { UpdateUserDto } from 'src/dtos/updateuser.dto';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/enum/user.enums';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGUard } from 'src/guards/auth.guard';
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
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(AuthGUard, AdminGuard)
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
    summary: 'Give employee role to a user',
    description: 'Give employee role to a user by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the user to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: GetUserByIdResponseSchema,
  })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGUard, AdminGuard)
  @Put('employee/:id')
  async giveEmployeeRole(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userRepository.giveEmployeeRole(id);
  }

  @ApiOperation({
    summary: 'Suspend a user',
    description: 'Suspend a user by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the user to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User suspended successfully',
    schema: {
      example: 'User suspended',
    },
  })
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(AuthGUard, AdminGuard)
  @Put('suspend/:id')
  async suspendUser(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return await this.userRepository.suspendUser(id);
  }

  @ApiOperation({
    summary: 'Suspend a user',
    description: 'Suspend a user by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the user to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User suspended successfully',
    schema: {
      example: 'User suspended',
    },
  })
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  @UseGuards(AuthGUard, AdminGuard)
  @Put('restore/:id')
  async restoreUser(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return await this.userRepository.restoreUser(id);
  }

  @Put('activate/:id')
  async activateUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.userRepository.activateUser(id);
  }
}
