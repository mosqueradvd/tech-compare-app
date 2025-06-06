
import { useState, useEffect } from 'react';
import { Comparison } from '@/types/product';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Comparison[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('techcompare-favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  const addFavorite = (comparison: Comparison) => {
    const updated = [...favorites, comparison];
    setFavorites(updated);
    localStorage.setItem('techcompare-favorites', JSON.stringify(updated));
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter(fav => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem('techcompare-favorites', JSON.stringify(updated));
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.id === id);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };
}
