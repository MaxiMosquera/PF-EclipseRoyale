import { ApiResponseOptions } from '@nestjs/swagger';

export const getReservationsEmailApiResponse: ApiResponseOptions = {
  status: 200,
  description: 'List of reservations with details',
  schema: {
    example: {
      data: [
        {
          id: '02e4e827-71a3-4826-a9f7-ef633f4eae6a',
          price: 95,
          startDate: '2024-10-14',
          status: 'canceled',
          endDate: '2024-10-15',
          createdAt: '2024-09-11T21:42:00.000Z',
          guestName1: 'John',
          guestLastName1: 'Doe',
          guestName2: 'Jane',
          guestLastName2: 'Doe',
          guestName3: 'Alice',
          guestLastName3: 'Smith',
          guestName4: null,
          guestLastName4: null,
          room: {
            id: 'c5d24712-ba9b-49f9-914b-7f110f5f7b37',
            number: 1,
            price: 60,
            category: 'suite',
            images: [
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6dfa24c23.jpg/1280x720/fit/80/6527703c22510107c74303e6f757a638.jpg',
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a7594df64c.jpg/1280x720/fit/80/faf7c52ed323ceb1e7bdd16307986a25.jpg',
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6f26c5e01.jpg/1280x720/fit/80/3ec135e0940c9e01b60d08917b28cf61.jpg',
            ],
          },
        },
        {
          id: 'f338106f-53bc-4bad-b90c-66096c05c506',
          price: 95,
          startDate: '2024-10-12',
          status: 'canceled',
          endDate: '2024-10-13',
          createdAt: '2024-09-11T21:42:00.000Z',
          guestName1: 'John',
          guestLastName1: 'Doe',
          guestName2: 'Jane',
          guestLastName2: 'Doe',
          guestName3: 'Alice',
          guestLastName3: 'Smith',
          guestName4: null,
          guestLastName4: null,
          room: {
            id: 'c5d24712-ba9b-49f9-914b-7f110f5f7b37',
            number: 1,
            price: 60,
            category: 'suite',
            images: [
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6dfa24c23.jpg/1280x720/fit/80/6527703c22510107c74303e6f757a638.jpg',
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a7594df64c.jpg/1280x720/fit/80/faf7c52ed323ceb1e7bdd16307986a25.jpg',
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6f26c5e01.jpg/1280x720/fit/80/3ec135e0940c9e01b60d08917b28cf61.jpg',
            ],
          },
        },
      ],
      total: 2,
      currentPage: 1,
      totalPages: 1,
    },
  },
};

export const getAllReservationsApiResponse: ApiResponseOptions = {
  status: 200,
  description: 'List of all reservations with details',
  schema: {
    example: {
      data: [
        {
          id: 'de31b0f2-86b6-4095-b316-1eaff5cdd4c2',
          price: 800,
          startDate: '2024-10-01',
          status: 'pending',
          endDate: '2024-10-06',
          createdAt: '2024-09-11T22:06:00.000Z',
          guestName1: null,
          guestLastName1: null,
          guestName2: null,
          guestLastName2: null,
          guestName3: null,
          guestLastName3: null,
          guestName4: null,
          guestLastName4: null,
          user: {
            id: '8d654c08-245b-484e-a4a0-97ca55a0eb9e',
            name: 'admin',
            phone: 123456789,
            email: 'admin@gmail.com',
            password:
              '$2b$10$hak0wASaP22ilT0T8U4L.esU5ZuPPrGpZC3JXLeXu7rVPVmmBRMku',
            image: null,
            adress: 'fake adress',
            role: 'admin',
            status: 'active',
          },
          room: {
            id: '2e92f438-be34-4c47-b278-644265732b0e',
            number: 36,
            price: 90,
            category: 'suite_premium',
            images: [
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e28ebc5c.jpg/1280x720/fit/80/55924029e80be08b5e1bc973da568304.jpg',
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e24ea923.jpg/1280x720/fit/80/0e33d15afaa2b8643bc654605310fd00.jpg',
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e16263a1.jpg/1280x720/fit/80/b5cb3a9baf2c86d81a7da452188db25e.jpg',
            ],
          },
        },
        {
          id: '72f38c9b-388d-4077-87a1-9992921ec2a1',
          price: 640,
          startDate: '2024-10-09',
          status: 'pending',
          endDate: '2024-10-13',
          createdAt: '2024-09-11T22:07:00.000Z',
          guestName1: null,
          guestLastName1: null,
          guestName2: null,
          guestLastName2: null,
          guestName3: null,
          guestLastName3: null,
          guestName4: null,
          guestLastName4: null,
          user: {
            id: '8d654c08-245b-484e-a4a0-97ca55a0eb9e',
            name: 'admin',
            phone: 123456789,
            email: 'admin@gmail.com',
            password:
              '$2b$10$hak0wASaP22ilT0T8U4L.esU5ZuPPrGpZC3JXLeXu7rVPVmmBRMku',
            image: null,
            adress: 'fake adress',
            role: 'admin',
            status: 'active',
          },
          room: {
            id: '2e92f438-be34-4c47-b278-644265732b0e',
            number: 36,
            price: 90,
            category: 'suite_premium',
            images: [
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e28ebc5c.jpg/1280x720/fit/80/55924029e80be08b5e1bc973da568304.jpg',
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e24ea923.jpg/1280x720/fit/80/0e33d15afaa2b8643bc654605310fd00.jpg',
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e16263a1.jpg/1280x720/fit/80/b5cb3a9baf2c86d81a7da452188db25e.jpg',
            ],
          },
        },
        {
          id: 'f338106f-53bc-4bad-b90c-66096c05c506',
          price: 95,
          startDate: '2024-10-12',
          status: 'canceled',
          endDate: '2024-10-13',
          createdAt: '2024-09-11T21:42:00.000Z',
          guestName1: 'John',
          guestLastName1: 'Doe',
          guestName2: 'Jane',
          guestLastName2: 'Doe',
          guestName3: 'Alice',
          guestLastName3: 'Smith',
          guestName4: null,
          guestLastName4: null,
          user: {
            id: 'd2313c53-e437-47d9-806d-f6351f37bd17',
            name: 'John Doe',
            phone: 123456789,
            email: 'pablorodriguez6003@gmail.com',
            password:
              '$2b$10$VJSBkHpC5ryuZ3yJ3iHVeej2Lkxe10vXdqkl3kHXYKT5yYzNNgD8S',
            image: null,
            adress: '123 Main St, Springfield',
            role: 'user',
            status: 'pending',
          },
          room: {
            id: 'c5d24712-ba9b-49f9-914b-7f110f5f7b37',
            number: 1,
            price: 60,
            category: 'suite',
            images: [
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6dfa24c23.jpg/1280x720/fit/80/6527703c22510107c74303e6f757a638.jpg',
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a7594df64c.jpg/1280x720/fit/80/faf7c52ed323ceb1e7bdd16307986a25.jpg',
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6f26c5e01.jpg/1280x720/fit/80/3ec135e0940c9e01b60d08917b28cf61.jpg',
            ],
          },
        },
        {
          id: '02e4e827-71a3-4826-a9f7-ef633f4eae6a',
          price: 95,
          startDate: '2024-10-14',
          status: 'canceled',
          endDate: '2024-10-15',
          createdAt: '2024-09-11T21:42:00.000Z',
          guestName1: 'John',
          guestLastName1: 'Doe',
          guestName2: 'Jane',
          guestLastName2: 'Doe',
          guestName3: 'Alice',
          guestLastName3: 'Smith',
          guestName4: null,
          guestLastName4: null,
          user: {
            id: 'd2313c53-e437-47d9-806d-f6351f37bd17',
            name: 'John Doe',
            phone: 123456789,
            email: 'pablorodriguez6003@gmail.com',
            password:
              '$2b$10$VJSBkHpC5ryuZ3yJ3iHVeej2Lkxe10vXdqkl3kHXYKT5yYzNNgD8S',
            image: null,
            adress: '123 Main St, Springfield',
            role: 'user',
            status: 'pending',
          },
          room: {
            id: 'c5d24712-ba9b-49f9-914b-7f110f5f7b37',
            number: 1,
            price: 60,
            category: 'suite',
            images: [
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6dfa24c23.jpg/1280x720/fit/80/6527703c22510107c74303e6f757a638.jpg',
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a7594df64c.jpg/1280x720/fit/80/faf7c52ed323ceb1e7bdd16307986a25.jpg',
              'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6f26c5e01.jpg/1280x720/fit/80/3ec135e0940c9e01b60d08917b28cf61.jpg',
            ],
          },
        },
      ],
      meta: {
        totalItems: 4,
        totalPages: 1,
        currentPage: 1,
        pageSize: 10,
      },
    },
  },
};

export const createReservationApiResponse: ApiResponseOptions = {
  status: 200,
  description: 'Details of a specific reservation',
  schema: {
    example: {
      id: 'f6175492-7c7d-4ee4-bec0-8cfffcc293a7',
      price: 950,
      startDate: '2024-10-10T03:00:00.000Z',
      endDate: '2024-10-20T03:00:00.000Z',
      createdAt: '2024-09-11T22:31:00.000Z',
      guestName1: 'John',
      guestLastName1: 'Doe',
      guestName2: 'Jane',
      guestLastName2: 'Doe',
      guestName3: 'Alice',
      guestLastName3: 'Smith',
      guestName4: null,
      guestLastName4: null,
      status: 'pending',
      user: {
        id: '8d654c08-245b-484e-a4a0-97ca55a0eb9e',
        name: 'admin',
        phone: 123456789,
        email: 'admin@gmail.com',
        password:
          '$2b$10$hak0wASaP22ilT0T8U4L.esU5ZuPPrGpZC3JXLeXu7rVPVmmBRMku',
        image: null,
        adress: 'fake adress',
        role: 'admin',
        status: 'active',
      },
      room: {
        id: 'c5d24712-ba9b-49f9-914b-7f110f5f7b37',
        number: 1,
        price: 60,
        category: 'suite',
        images: [
          'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6dfa24c23.jpg/1280x720/fit/80/6527703c22510107c74303e6f757a638.jpg',
          'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a7594df64c.jpg/1280x720/fit/80/faf7c52ed323ceb1e7bdd16307986a25.jpg',
          'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6f26c5e01.jpg/1280x720/fit/80/3ec135e0940c9e01b60d08917b28cf61.jpg',
        ],
      },
    },
  },
};