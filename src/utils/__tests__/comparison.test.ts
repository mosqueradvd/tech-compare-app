
import '@testing-library/jest-dom';
import { compareSpecs } from '../comparison';
import { Product } from '@/types/product';

describe('compareSpecs', () => {
  const mockProduct1: Product = {
    id: 1,
    name: 'iPhone 14',
    brand: 'Apple',
    category: 'smartphone',
    price: 999,
    image: 'test-image-1.jpg',
    specs: {
      ram: '6GB',
      battery: '3279mAh',
      storage: '128GB',
      processor: 'A15 Bionic',
    },
    rating: 4.5,
    description: 'Test iPhone',
  };

  const mockProduct2: Product = {
    id: 2,
    name: 'Samsung Galaxy S23',
    brand: 'Samsung',
    category: 'smartphone',
    price: 899,
    image: 'test-image-2.jpg',
    specs: {
      ram: '8GB',
      battery: '3900mAh',
      storage: '256GB',
      processor: 'Snapdragon 8 Gen 2',
    },
    rating: 4.3,
    description: 'Test Samsung',
  };

  it('should compare RAM correctly', () => {
    const result = compareSpecs(mockProduct1, mockProduct2);
    expect(result.reasons).toContain('Samsung Galaxy S23 tiene más RAM (8GB vs 6GB)');
  });

  it('should compare battery correctly', () => {
    const result = compareSpecs(mockProduct1, mockProduct2);
    expect(result.reasons).toContain('Samsung Galaxy S23 tiene mejor batería (3900mAh vs 3279mAh)');
  });

  it('should compare storage correctly', () => {
    const result = compareSpecs(mockProduct1, mockProduct2);
    expect(result.reasons).toContain('Samsung Galaxy S23 tiene más almacenamiento (256GB vs 128GB)');
  });

  it('should compare price correctly (lower is better)', () => {
    const result = compareSpecs(mockProduct1, mockProduct2);
    expect(result.reasons).toContain('Samsung Galaxy S23 tiene mejor precio ($899 vs $999)');
  });

  it('should compare rating correctly', () => {
    const result = compareSpecs(mockProduct1, mockProduct2);
    expect(result.reasons).toContain('iPhone 14 tiene mejor valoración (4.5 vs 4.3)');
  });

  it('should determine winner correctly', () => {
    const result = compareSpecs(mockProduct1, mockProduct2);
    expect(result.winner).toBe(mockProduct2); // Samsung should win based on more specs
    expect(result.scores.product2).toBeGreaterThan(result.scores.product1);
  });

  it('should limit reasons to maximum of 3', () => {
    const result = compareSpecs(mockProduct1, mockProduct2);
    expect(result.reasons.length).toBeLessThanOrEqual(3);
  });

  it('should handle products with missing specs', () => {
    const productWithMissingSpecs: Product = {
      ...mockProduct1,
      specs: {
        ram: '4GB',
      },
    };
    
    const result = compareSpecs(productWithMissingSpecs, mockProduct2);
    expect(result).toBeDefined();
    expect(result.winner).toBeDefined();
  });
});
