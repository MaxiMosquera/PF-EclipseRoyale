import { Category } from 'src/enum/room.enums';
import { roomImages } from './roomsimages';
import { log } from 'console';

console.log(roomImages);

export const rooms = [
  ...Array.from({ length: 20 }, (_, i) => ({
    number: i + 1,
    price: 60,
    category: Category.SUITE,
    images: roomImages[Category.SUITE] || [],
    features: [{ name: 'Dos camas individuales' }],
    
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    number: i + 21,
    price: 90,
    category: Category.SUITE_PREMIUM,
    images: roomImages[Category.SUITE_PREMIUM] || [],
    features: [{ name: 'Cama King Size' }, { name: 'Jacuzzi' }],
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    number: i + 41,
    price: 120,
    category: Category.LOFT,
    images: roomImages[Category.LOFT]   || [],
    features: [{ name: 'Dos camas individuales' }, { name: 'Cama King Size' }],
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    number: i + 61,
    price: 200,
    category: Category.LOFT_PREMIUM,
    images: roomImages[Category.LOFT_PREMIUM] || [],
    features: [
      { name: 'Dos camas individuales' },
      { name: 'Cama King Size' },
      { name: 'Balcón Privado' },
      { name: 'Jacuzzi' },
    ],
  })),
];
