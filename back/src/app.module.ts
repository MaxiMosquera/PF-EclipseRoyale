import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [UsersModule, ReservationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// hola