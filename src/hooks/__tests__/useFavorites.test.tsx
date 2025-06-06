
import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useFavorites } from '../useFavorites';
import { Comparison } from '@/types/product';

const mockComparison: Comparison = {
  id: 'test-comparison-1',
  product1: {
    id: 1,
    name: 'Product 1',
    brand: 'Brand 1',
    category: 'smartphone',
    price: 699,
    image: 'image1.jpg',
    specs: {},
    rating: 4.5,
    description: 'Test product 1',
  },
  product2: {
    id: 2,
    name: 'Product 2',
    brand: 'Brand 2',
    category: 'laptop',
    price: 999,
    image: 'image2.jpg',
    specs: {},
    rating: 4.2,
    description: 'Test product 2',
  },
  createdAt: '2024-01-01T00:00:00Z',
  recommendation: {
    winner: {
      id: 1,
      name: 'Product 1',
      brand: 'Brand 1',
      category: 'smartphone',
      price: 699,
      image: 'image1.jpg',
      specs: {},
      rating: 4.5,
      description: 'Test product 1',
    },
    reasons: ['Better price', 'Higher rating'],
  },
};

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should initialize with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.favorites).toEqual([]);
  });

  it('should load favorites from localStorage on mount', () => {
    const storedFavorites = [mockComparison];
    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(storedFavorites));
    
    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.favorites).toEqual(storedFavorites);
  });

  it('should add a favorite', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addFavorite(mockComparison);
    });
    
    expect(result.current.favorites).toContain(mockComparison);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'techcompare-favorites',
      JSON.stringify([mockComparison])
    );
  });

  it('should remove a favorite', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addFavorite(mockComparison);
    });
    
    act(() => {
      result.current.removeFavorite(mockComparison.id);
    });
    
    expect(result.current.favorites).not.toContain(mockComparison);
    expect(result.current.favorites).toHaveLength(0);
  });

  it('should check if comparison is favorite', () => {
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.addFavorite(mockComparison);
    });
    
    expect(result.current.isFavorite(mockComparison.id)).toBe(true);
    expect(result.current.isFavorite('non-existent-id')).toBe(false);
  });

  it('should handle localStorage errors gracefully', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue('invalid-json');
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const { result } = renderHook(() => useFavorites());
    
    expect(result.current.favorites).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});
