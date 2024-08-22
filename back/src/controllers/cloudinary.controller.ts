import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Room } from "src/entities/room.entity";
import { Service } from "src/entities/service.entity";
import { User } from "src/entities/user.entity";

import { FeatureRepository } from "src/repositories/feature.repository";
import { RoomRepository } from "src/repositories/room.repository";
import { ServiceRepository } from "src/repositories/services.repository";
import { UserRepository } from "src/repositories/user.repository";
import { CloudinaryService } from "src/services/cloudinary.service";


@Controller('files')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly userRepository: UserRepository,
    private readonly roomRepository: RoomRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly featureRepository: FeatureRepository,
  ) { }

  @Post('uploadUserImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        // Validación del tipo de archivo
        validators: [
          new MaxFileSizeValidator({
            maxSize: 20000000000000, // 200KB

            message: 'El tamaño máximo es de 200000KB',
          }),
          new FileTypeValidator({ fileType: /.(jpg|jpeg|png|gif|webp|avif)$/ }), // Validación del tipo de archivo
        ],
      }),
    )
    file: Express.Multer.File, // Validación del archivo , lo bautizo como FILE a lo que recibo por body(parametro)
  ): Promise<User> {
    await this.userRepository.getUserById(id);
    const image = await this.cloudinaryService.uploadImage(file);
    return await this.userRepository.updateUser(id, { image: image.url });
  }


  @Post('uploadRoomImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadRoomImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        // Validación del tipo de archivo
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2000000000, // 200KB

            message: 'El tamaño máximo es de 200KB',
          }),
          new FileTypeValidator({ fileType: /.(jpg|jpeg|png|gif|webp|avif)$/ }), // Validación del tipo de archivo
        ],
      }),
    )
    file: Express.Multer.File, // Validación del archivo , lo bautizo como FILE a lo que recibo por body(parametro)
  ): Promise<Room> {
    await this.roomRepository.getRoomById(id);
    const image = await this.cloudinaryService.uploadImage(file);
    return await this.roomRepository.updateRoom(id, { image: image.url });
  }


}