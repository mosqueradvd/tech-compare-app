
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "smartphone",
    price: 999,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    specs: {
      display: "6.1\" OLED Super Retina XDR",
      ram: "8GB",
      storage: "128GB",
      battery: "3274mAh",
      processor: "A17 Pro Bionic",
      camera: "48MP Triple Camera",
      os: "iOS 17",
      weight: "187g",
      connectivity: ["5G", "WiFi 6E", "Bluetooth 5.3"]
    },
    rating: 4.8,
    description: "El smartphone más avanzado de Apple con chip A17 Pro y cámaras profesionales."
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "smartphone",
    price: 1199,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
    specs: {
      display: "6.8\" Dynamic AMOLED 2X",
      ram: "12GB",
      storage: "256GB",
      battery: "5000mAh",
      processor: "Snapdragon 8 Gen 3",
      camera: "200MP Quad Camera",
      os: "Android 14",
      weight: "232g",
      connectivity: ["5G", "WiFi 7", "Bluetooth 5.3"]
    },
    rating: 4.7,
    description: "El flagship de Samsung con S Pen integrado y cámaras de nivel profesional."
  },
  {
    id: 3,
    name: "MacBook Pro 14\"",
    brand: "Apple",
    category: "laptop",
    price: 1999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    specs: {
      display: "14.2\" Liquid Retina XDR",
      ram: "16GB",
      storage: "512GB SSD",
      battery: "70Wh",
      processor: "M3 Pro",
      os: "macOS Sonoma",
      weight: "1.6kg",
      connectivity: ["WiFi 6E", "Bluetooth 5.3", "Thunderbolt 4"]
    },
    rating: 4.9,
    description: "Laptop profesional con chip M3 Pro para desarrolladores y creativos."
  },
  {
    id: 4,
    name: "Dell XPS 13",
    brand: "Dell",
    category: "laptop",
    price: 1299,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    specs: {
      display: "13.4\" OLED InfinityEdge",
      ram: "16GB",
      storage: "512GB SSD",
      battery: "55Wh",
      processor: "Intel Core i7-1365U",
      os: "Windows 11",
      weight: "1.2kg",
      connectivity: ["WiFi 6E", "Bluetooth 5.2", "USB-C"]
    },
    rating: 4.6,
    description: "Ultrabook premium con diseño ultradelgado y pantalla OLED impresionante."
  },
  {
    id: 5,
    name: "iPad Pro 12.9\"",
    brand: "Apple",
    category: "tablet",
    price: 1099,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    specs: {
      display: "12.9\" Liquid Retina XDR",
      ram: "8GB",
      storage: "256GB",
      battery: "10758mAh",
      processor: "M2",
      camera: "12MP Wide + 10MP Ultra Wide",
      os: "iPadOS 17",
      weight: "682g",
      connectivity: ["WiFi 6E", "Bluetooth 5.3", "USB-C"]
    },
    rating: 4.7,
    description: "Tablet profesional con chip M2 y compatibilidad con Apple Pencil."
  },
  {
    id: 6,
    name: "Surface Pro 9",
    brand: "Microsoft",
    category: "tablet",
    price: 999,
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=300&fit=crop",
    specs: {
      display: "13\" PixelSense Flow",
      ram: "16GB",
      storage: "256GB SSD",
      battery: "15.5h",
      processor: "Intel Core i7-1255U",
      os: "Windows 11",
      weight: "878g",
      connectivity: ["WiFi 6E", "Bluetooth 5.1", "USB-C"]
    },
    rating: 4.5,
    description: "Tablet 2-en-1 con Windows completo y teclado extraíble."
  }
];
