import { ApiProperty, ApiResponseOptions } from '@nestjs/swagger';
import { Service } from 'src/entities/service.entity';
import { Type } from 'src/enum/service.enums';


export class GetAllServicesResponseDto {
  @ApiProperty({
    type: [Service],
    description: 'List of hotel services',
    example: [
      {
        id: 'c386d899-4e52-4dde-9bf7-5fc5d261573e',
        type:Type.BREAKFAST,
        price: 100,
        description: 'Bar con una gran variedad de cócteles y bebidas.',
      },
      {
        id: 'c711c655-450a-4d5c-8b17-6e306f973818',
        type:Type.SPA,
        price: 200,
        description: 'Servicio de spa con masajes y tratamientos de relajación.',
      },
      // Otros objetos Service aquí
    ],
  })
  data: Service[];

  @ApiProperty({
    description: 'Total number of services available',
    example: 5,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  currentPage: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 1,
  })
  totalPages: number;
}

export const getServiceByIdApiResponse: ApiResponseOptions = {
    status: 200,
    description: 'Successful response with service details',
    schema: {
      example: {
        id: '4ca4631a-44a1-466c-b6ed-4208ae7ba554',
        price: 50,
        type: 'breakfast',
      },
    },
  };

  export const createServiceApiResponse: ApiResponseOptions = {
    status: 201,
    description: 'Service created successfully',
    schema: {
      example: {
        id: '4ca4631a-44a1-466c-b6ed-4208ae7ba554',
        price: 50,
        type: 'BREAKFAST',
        reservationServices: [],
      },
    },
  };


export const updateServiceByIdApiResponse: ApiResponseOptions = {
    status: 200,
    description: 'Service updated successfully',
    schema: {
      example: {
        id: '4ca4631a-44a1-466c-b6ed-4208ae7ba554',
        price: 75,  // El nuevo precio actualizado
        type: 'BREAKFAST',  // El tipo actualizado o sin cambios
        reservationServices: [],  // Lista de servicios de reserva asociados (sin cambios)
      },
    },
  };
  
