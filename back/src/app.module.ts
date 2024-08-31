import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './config/typeorm';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { RoomModule } from './modules/room.module';
import { ServiceModule } from './modules/service.module';
import { FeatureModule } from './modules/feature.module';
import { CloudinaryModule } from './modules/cloudinary.module';
import { ReservationModule } from './modules/reservation.module';
import { MailService } from './services/mail.service';
import { MailModule } from './modules/mail.module';
import { MercadopagoModule } from './modules/mercadoPago.module';
import { ScheduleModule } from '@nestjs/schedule';
// import { CloudinaryModule } from './modules/cloudinary.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, load: [typeormConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('typeorm'),
      }),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    AuthModule,
    RoomModule,
    ServiceModule,
    FeatureModule,
    CloudinaryModule,
    ReservationModule,
    MailModule,
    MercadopagoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
