import { ApiProperty } from '@nestjs/swagger';
import { Room } from 'src/entities/room.entity';
import { ApiResponseOptions } from '@nestjs/swagger';

export class GetAllRoomsResponseDto {
  @ApiProperty({
    type: [Room],
    description: 'List of rooms',
    example: [
      {
        id: '98503977-68b9-4086-91f4-287edbe68b7a',
        number: 7,
        price: 60,
        category: 'suite',
        features: [
          {
            id: '80ab6bde-a934-4792-a0be-23cbfe8fc034',
            name: 'Dos camas individuales',
          },
        ],
        reservations: [],
      },
      // Otros objetos Room aquí
    ],
  })
  data: Room[];

  @ApiProperty({
    description: 'Total number of rooms available',
    example: 20,
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

export const getAllRoomsApiResponse: ApiResponseOptions = {
  status: 200,
  description: 'Successful response',
  schema: {
    example: {
      'application/json': {
        data: [
          {
            id: '98503977-68b9-4086-91f4-287edbe68b7a',
            number: 7,
            price: 60,
            category: 'suite',
            features: [
              {
                id: '80ab6bde-a934-4792-a0be-23cbfe8fc034',
                name: 'Dos camas individuales',
              },
            ],
            reservations: [],
          },
          {
            otherRooms: '...',
          },
        ],
        total: 20,
        currentPage: 1,
        totalPages: 1,
      },
    },
  },
};

export const getRoomByIdApiResponse: ApiResponseOptions = {
  status: 200,
  description: 'Successful response with room details and available services',
  schema: {
    example: [
      {
        id: '6f9a822a-aba4-4b33-a0dd-7f5ace71da31',
        number: 1,
        price: 60,
        category: 'suite',
        features: [
          {
            id: '80ab6bde-a934-4792-a0be-23cbfe8fc034',
            name: 'Dos camas individuales',
          },
        ],
      },
      [
        {
          id: '92c5c6d9-dd51-4117-a40b-b8921b10bad0',
          price: 50,
          type: 'breakfast',
        },
        {
          id: 'c386d899-4e52-4dde-9bf7-5fc5d261573e',
          price: 100,
          type: 'hotelbar',
        },
        {
          id: 'c711c655-450a-4d5c-8b17-6e306f973818',
          price: 200,
          type: 'spa',
        },
      ],
    ],
  },
};

export const AddFeatureApiResponse: ApiResponseOptions = {
  status: 200,
  description: 'Successful response with room details and available services',
  schema: {
    example: [
      {
        id: '6f9a822a-aba4-4b33-a0dd-7f5ace71da31',
        number: 1,
        price: 60,
        category: 'suite',
        features: [
          {
            id: '80ab6bde-a934-4792-a0be-23cbfe8fc034',
            name: 'Dos camas individuales',
          },
          {
            id: '80ab6bde-a934-4792-a0be-23cbfe8fc034',
            name: 'Sea View',
          },
        ],
      },
      [
        {
          id: '92c5c6d9-dd51-4117-a40b-b8921b10bad0',
          price: 50,
          type: 'breakfast',
        },
        {
          id: 'c386d899-4e52-4dde-9bf7-5fc5d261573e',
          price: 100,
          type: 'hotelbar',
        },
        {
          id: 'c711c655-450a-4d5c-8b17-6e306f973818',
          price: 200,
          type: 'spa',
        },
      ],
    ],
  },
};
