import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { User } from 'src/entities/user.entity';
import { AuthRepository } from 'src/repositories/auth.repository';
import { MailModule } from './mail.module';
import { MailService } from 'src/services/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from 'src/config/google.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MailModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthRepository, MailService, GoogleStrategy],
})
export class AuthModule {}
