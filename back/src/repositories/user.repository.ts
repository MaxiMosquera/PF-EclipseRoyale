import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role, Status } from 'src/enum/user.enums';
import { UpdateUserDto } from 'src/dtos/updateuser.dto';

@Injectable()
export class UserRepository implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const user = await this.userRepository.findOne({
      where: { email: 'admin@gmail.com' },
    });

    if (user) {
      return;
    }

    const hashedPassword = await bcrypt.hash('admin', 10);

    const newUser = this.userRepository.create({
      name: 'admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      phone: 123456789,
      adress: 'fake adress',
      role: Role.ADMIN,
      status: Status.ACTIVE,
    });

    await this.userRepository.save(newUser);
    console.log('admin created');
  }

  async getAllUsers(page: number, limit: number): Promise<User[]> {
    const [users]: [User[], number] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!users.length) {
      throw new NotFoundException(
        'Users not found, please create at least one',
      );
    }

    return users;
  }

  async getUserById(id: string): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { id },
      relations: { reservations: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: string, data: Partial<UpdateUserDto>): Promise<User> {
    const user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (
      (data.password && !data.oldPassword) ||
      (!data.password && data.oldPassword)
    ) {
      throw new BadRequestException('Old & new passwords are required');
    }

    if (data.password && data.oldPassword) {
      const isOldPasswordValid: boolean = await bcrypt.compare(
        data.oldPassword,
        user.password,
      );
      if (!isOldPasswordValid) {
        throw new BadRequestException('Old password is not valid');
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }

    const updatedUser = this.userRepository.merge(user, data);
    await this.userRepository.save(updatedUser);

    return updatedUser;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async deleteUser(id: string): Promise<string> {
    const user: User = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
    return 'User deleted';
  }
}
