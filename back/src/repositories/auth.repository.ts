import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeeDto, CreateUserDto } from 'src/dtos/user.dtos';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/services/mail.service';
import { Role } from 'src/enum/user.enums';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(body: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = this.userRepository.create({
      ...body,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    await this.mailService.sendUserConfirmation(user);

    console.log('user created');

    return user;
  }

  async registerEmployee(body: CreateEmployeeDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = this.userRepository.create({
      ...body,
      role: Role.EMPLOYEE,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    await this.mailService.sendUserConfirmation(user);

    return user;
  }

  async createJwtToken(user: User): Promise<string> {
    const payload: any = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ message: string; token: string; user: User }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Invalid email');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new NotFoundException('Invalid password');
    }

    const token: string = await this.createJwtToken(user);
    return {
      message: 'Login successful',
      token,
      user: user,
    };
  }

  async googleLogin(
    profile: any,
  ): Promise<{ createdUser: User; isNew: boolean }> {
    const { email, firstName, lastName, picture } = profile;

    // Check if the user exists
    let user = await this.userRepository.findOne({ where: { email } });

    // If user does not exist, create a new user
    if (!user) {
      const adress = '';
      user = this.userRepository.create({
        email,
        name: `${firstName} ${lastName}`,
        image: picture,
        password: '', // You may or may not use this depending on your use case
        adress: adress,
      });
      await this.userRepository.save(user);
      return { createdUser: user, isNew: true };
    }

    return { createdUser: user, isNew: false };
  }

  async sendEmail(user: User): Promise<void> {
    await this.mailService.sendUserConfirmationGoogle(user);
  }

  async findByEmail(email: any) {
    return this.userRepository.findOne({ where: { email } });
  }
}
