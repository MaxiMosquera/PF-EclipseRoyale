import { Controller, Delete, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}
  @Get()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<User[]> {
    return await this.userRepository.getAllUsers(page, limit);
  }

  @Get(':id')
  async getUserById(@Param('id',ParseUUIDPipe) id: string): Promise<User> {
    return await this.userRepository.getUserById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return await this.userRepository.deleteUser(id);
  }
}
