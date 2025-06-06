
import { Product } from '@/types/product';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isSelected?: boolean;
}

export function ProductCard({ product, onSelect, isSelected }: ProductCardProps) {
  return (
    <Card className={`transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${
      isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
    }`}>
      <CardHeader className="pb-2">
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
          <OptimizedImage
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            width={300}
            height={192}
          />
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 bg-white/90 text-gray-700"
          >
            {product.category}
          </Badge>
        </div>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{product.brand}</Badge>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          <Button 
            onClick={() => onSelect(product)}
            variant={isSelected ? "default" : "outline"}
            size="sm"
          >
            {isSelected ? 'Seleccionado' : 'Seleccionar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
