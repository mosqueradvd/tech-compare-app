
import { Product } from '@/types/product';

export function compareSpecs(product1: Product, product2: Product) {
  const scores = {
    product1: 0,
    product2: 0
  };
  
  const reasons: string[] = [];

  // Comparar RAM
  if (product1.specs.ram && product2.specs.ram) {
    const ram1 = parseInt(product1.specs.ram);
    const ram2 = parseInt(product2.specs.ram);
    if (ram1 > ram2) {
      scores.product1++;
      reasons.push(`${product1.name} tiene más RAM (${product1.specs.ram} vs ${product2.specs.ram})`);
    } else if (ram2 > ram1) {
      scores.product2++;
      reasons.push(`${product2.name} tiene más RAM (${product2.specs.ram} vs ${product1.specs.ram})`);
    }
  }

  // Comparar batería
  if (product1.specs.battery && product2.specs.battery) {
    const battery1 = parseInt(product1.specs.battery);
    const battery2 = parseInt(product2.specs.battery);
    if (battery1 > battery2) {
      scores.product1++;
      reasons.push(`${product1.name} tiene mejor batería (${product1.specs.battery} vs ${product2.specs.battery})`);
    } else if (battery2 > battery1) {
      scores.product2++;
      reasons.push(`${product2.name} tiene mejor batería (${product2.specs.battery} vs ${product1.specs.battery})`);
    }
  }

  // Comparar almacenamiento
  if (product1.specs.storage && product2.specs.storage) {
    const storage1 = parseInt(product1.specs.storage);
    const storage2 = parseInt(product2.specs.storage);
    if (storage1 > storage2) {
      scores.product1++;
      reasons.push(`${product1.name} tiene más almacenamiento (${product1.specs.storage} vs ${product2.specs.storage})`);
    } else if (storage2 > storage1) {
      scores.product2++;
      reasons.push(`${product2.name} tiene más almacenamiento (${product2.specs.storage} vs ${product1.specs.storage})`);
    }
  }

  // Comparar precio (menor es mejor)
  if (product1.price < product2.price) {
    scores.product1++;
    reasons.push(`${product1.name} tiene mejor precio ($${product1.price} vs $${product2.price})`);
  } else if (product2.price < product1.price) {
    scores.product2++;
    reasons.push(`${product2.name} tiene mejor precio ($${product2.price} vs $${product1.price})`);
  }

  // Comparar rating
  if (product1.rating > product2.rating) {
    scores.product1++;
    reasons.push(`${product1.name} tiene mejor valoración (${product1.rating} vs ${product2.rating})`);
  } else if (product2.rating > product1.rating) {
    scores.product2++;
    reasons.push(`${product2.name} tiene mejor valoración (${product2.rating} vs ${product1.rating})`);
  }

  const winner = scores.product1 > scores.product2 ? product1 : 
                 scores.product2 > scores.product1 ? product2 : null;

  return {
    winner,
    reasons: reasons.slice(0, 3), // Mostrar solo las 3 razones principales
    scores
  };
}
