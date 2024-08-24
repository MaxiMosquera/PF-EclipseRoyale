import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { User } from 'src/entities/user.entity';
import { AuthRepository } from 'src/repositories/auth.repository';
import { MailModule } from './mail.module';
import { MailService } from 'src/services/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule],
  controllers: [AuthController],
  providers: [AuthRepository, MailService],
})
export class AuthModule {}
