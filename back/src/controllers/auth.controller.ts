import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { LoginSwagger, RegisterSwagger } from 'src/decorators/auth.decorator';
import { CredentialsDto } from 'src/dtos/credentials.dto';
import { CreateUserDto } from 'src/dtos/user.dtos';
import { User } from 'src/entities/user.entity';
import { AuthRepository } from 'src/repositories/auth.repository';
import { Request, Response } from 'express'; // Importar desde 'express'

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
  async login(
    @Body() body: CredentialsDto,
  ): Promise<{ message: string; token: string }> {
    return await this.authRepository.login(body.email, body.password);
  }

  @Get('googleLogin')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request, @Res() res: Response): Promise<void> {
    // El flujo de redirección será manejado por el `AuthGuard`
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response): Promise<void> {
    const { createdUser, isNew } = await this.authRepository.googleLogin(
      req.user,
    );
    const user = await this.authRepository.findByEmail(req.user.email); // Usar el repositorio para buscar el usuario
    const jwt = await this.authRepository.createJwtToken(user);
    if (isNew) {
      await this.authRepository.sendEmail(createdUser); // Método para enviar email
    }
    const state = {
      user: {
        email: createdUser.email,
        name: createdUser.name,
        image: createdUser.image,
      },
      access_token: jwt,
    };
    res.redirect(
      `http://localhost:3001/auth/google?state=${encodeURIComponent(JSON.stringify(state))}`,
      // `https://front-hotel-app-six.vercel.app/auth/google?state=${encodeURIComponent(JSON.stringify(state))}`,
    );
  }
}
