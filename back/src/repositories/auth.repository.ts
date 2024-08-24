import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/user.dtos';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from "nodemailer";

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "contactoeclipseroyale@gmail.com",
        pass: "pyyk uqsb jnvu vzhu"
        //pass: "1234eclipse.",
      }
    });

    async function main() {

      const info = await transporter.sendMail({
        from: "contactoeclipseroyale@gmail.com", 
        to: body.email, 
        subject: "Confirmacion de Registro Hotel Eclipse Royale", 
        text: "Gracias por registrarte con Hoteles Eclipse Royale", 
        html: "<h1>Gracias Por Registrarte con Hotel Eclipse Royale</h1> <p>Una vez registrado puedes acceder a nuestros servicios</p>", 
      });
    
      console.log("Mensaje enviado: %s", info.messageId);
      
    }
    
    main().catch(console.error);

    return user;
  }

  async createJwtToken(user: any): Promise<string> {
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
  ): Promise<{ message: string; token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('invalid email');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new NotFoundException('invalid password');
    }

    const token: string = await this.createJwtToken(user);
    return {
      message: 'Login successful',
      token,
    };
  }
}
