import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "mercadopago";
import { CloudinaryConfig } from "src/config/cloudinary";
import { CloudinaryController } from "src/controllers/cloudinary.controller";
import { Features } from "src/entities/features.entity";
import { Reservation } from "src/entities/reservation.entity";
import { Room } from "src/entities/room.entity";
import { Service } from "src/entities/service.entity";
import { FeatureRepository } from "src/repositories/feature.repository";
import { RoomRepository } from "src/repositories/room.repository";
import { ServiceRepository } from "src/repositories/services.repository";
import { UserRepository } from "src/repositories/user.repository";
import { CloudinaryService } from "src/services/cloudinary.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Room, Reservation,Features,Service])],
    controllers: [CloudinaryController],
    providers: [
        UserRepository,
        RoomRepository,
        ServiceRepository,
        FeatureRepository,
        CloudinaryService,
        CloudinaryConfig,
    ],
}) 
export class CloudinaryModule {}