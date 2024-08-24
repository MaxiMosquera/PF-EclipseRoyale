import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginSwagger, RegisterSwagger } from 'src/decorators/auth.decorator';
import { CredentialsDto } from 'src/dtos/credentials.dto';
import { CreateUserDto } from 'src/dtos/user.dtos';
import { User } from 'src/entities/user.entity';
import { AuthRepository } from 'src/repositories/auth.repository';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  @Post('register')
  @RegisterSwagger()
  async register(@Body() body: CreateUserDto): Promise<User> {
    return await this.authRepository.register(body);
  }

  @Post('login')
  @LoginSwagger()
  async login(@Body() body: CredentialsDto): Promise<{ message: string, token: string }> {
    return await this.authRepository.login(body.email, body.password);
  }
}
