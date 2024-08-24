// src/responses/api-responses.ts

export const UserResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'dfeb00a2-79b3-49cc-a4e9-b3a6f30ec3f5',
    },
    name: {
      type: 'string',
      example: 'admin',
    },
    phone: {
      type: 'number',
      example: 123456789,
    },
    email: {
      type: 'string',
      example: 'admin@gmail.com',
    },
    password: {
      type: 'string',
      example: '$2b$10$Xcw4xxNBU2EGHkyPHO4XK.PDSU.CYsuJETqMgkDxcwX.KgfpuRldy',
    },
    image: {
      type: 'string',
      example: null,
      nullable: true,
    },
    adress: {
      type: 'string',
      example: 'fake adress',
    },
    role: {
      type: 'string',
      example: 'admin',
    },
    status: {
      type: 'string',
      example: 'active',
    },
    reservations: {
      type: 'array',
      items: {
        type: 'object',
        description: 'Reservation details if any exist.',
      },
      example: [],
    },
  },
};

export const GetAllUsersResponseSchema = {
  type: 'array',
  items: UserResponseSchema,
};

export const GetUserByIdResponseSchema = UserResponseSchema;

// export const UserByIdSchema = {
//   type: 'object',
//   properties: {
//     id: {
//       type: 'string',
//       example: 'dfeb00a2-79b3-49cc-a4e9-b3a6f30ec3f5',
//     },
//     name: {
//       type: 'string',
//       example: 'admin',
//     },
//     phone: {
//       type: 'number',
//       example: 123456789,
//     },
//     email: {
//       type: 'string',
//       example: 'admin@gmail.com',
//     },
//     password: {
//       type: 'string',
//       example: '$2b$10$Xcw4xxNBU2EGHkyPHO4XK.PDSU.CYsuJETqMgkDxcwX.KgfpuRldy',
//     },
//     image: {
//       type: 'string',
//       example: null,
//       nullable: true,
//     },
//     adress: {
//       type: 'string',
//       example: 'fake adress',
//     },
//     role: {
//       type: 'string',
//       example: 'admin',
//     },
//     status: {
//       type: 'string',
//       example: 'active',
//     },
//     reservations: {
//       type: 'array',
//       items: {
//         type: 'object',
//         description: 'Reservation details if any exist.',
//       },
//       example: [],
//     },
//   },
// };

// export const GetUserResponseSchema = {
//   type: 'array',
//   items: UserByIdSchema,
// };

// export
