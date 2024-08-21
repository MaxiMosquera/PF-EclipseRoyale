import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role, Status } from 'src/enum/user.enums';

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
  }
}
