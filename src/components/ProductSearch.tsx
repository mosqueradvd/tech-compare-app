
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface ProductSearchProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
}

export function ProductSearch({ onSearch, onCategoryFilter }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select onValueChange={onCategoryFilter}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          <SelectItem value="smartphone">Smartphones</SelectItem>
          <SelectItem value="laptop">Laptops</SelectItem>
          <SelectItem value="tablet">Tablets</SelectItem>
          <SelectItem value="smartwatch">Smartwatches</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
