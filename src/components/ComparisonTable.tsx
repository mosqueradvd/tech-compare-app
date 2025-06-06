
import { Product } from '@/types/product';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Heart, Trophy } from 'lucide-react';
import { compareSpecs } from '@/utils/comparison';
import { OptimizedImage } from './OptimizedImage';

interface ComparisonTableProps {
  product1: Product;
  product2: Product;
  onSaveComparison: () => void;
  isFavorite: boolean;
}

export function ComparisonTable({ product1, product2, onSaveComparison, isFavorite }: ComparisonTableProps) {
  const comparison = compareSpecs(product1, product2);

  const SpecRow = ({ label, value1, value2 }: { label: string, value1?: string, value2?: string }) => (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
      <div className="font-medium text-gray-700">{label}</div>
      <div className="text-center">{value1 || 'N/A'}</div>
      <div className="text-center">{value2 || 'N/A'}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Productos Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={comparison.winner?.id === product1.id ? 'ring-2 ring-green-500' : ''}>
          <CardHeader className="text-center">
            <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
              <OptimizedImage
                src={product1.image} 
                alt={product1.name}
                className="w-full h-full object-cover"
                width={320}
                height={160}
              />
              {comparison.winner?.id === product1.id && (
                <div className="absolute top-2 right-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>
              )}
            </div>
            <CardTitle className="text-xl">{product1.name}</CardTitle>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline">{product1.brand}</Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{product1.rating}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600">${product1.price}</div>
          </CardHeader>
        </Card>

        <Card className={comparison.winner?.id === product2.id ? 'ring-2 ring-green-500' : ''}>
          <CardHeader className="text-center">
            <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
              <OptimizedImage
                src={product2.image} 
                alt={product2.name}
                className="w-full h-full object-cover"
                width={320}
                height={160}
              />
              {comparison.winner?.id === product2.id && (
                <div className="absolute top-2 right-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>
              )}
            </div>
            <CardTitle className="text-xl">{product2.name}</CardTitle>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline">{product2.brand}</Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{product2.rating}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600">${product2.price}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Tabla de Especificaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Comparación de Especificaciones
            <Button 
              onClick={onSaveComparison}
              variant={isFavorite ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Guardado' : 'Guardar'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 py-2 border-b-2 border-gray-200 font-semibold">
            <div>Especificación</div>
            <div className="text-center">{product1.name}</div>
            <div className="text-center">{product2.name}</div>
          </div>
          
          <SpecRow label="Pantalla" value1={product1.specs.display} value2={product2.specs.display} />
          <SpecRow label="RAM" value1={product1.specs.ram} value2={product2.specs.ram} />
          <SpecRow label="Almacenamiento" value1={product1.specs.storage} value2={product2.specs.storage} />
          <SpecRow label="Batería" value1={product1.specs.battery} value2={product2.specs.battery} />
          <SpecRow label="Procesador" value1={product1.specs.processor} value2={product2.specs.processor} />
          <SpecRow label="Cámara" value1={product1.specs.camera} value2={product2.specs.camera} />
          <SpecRow label="Sistema Operativo" value1={product1.specs.os} value2={product2.specs.os} />
          <SpecRow label="Peso" value1={product1.specs.weight} value2={product2.specs.weight} />
        </CardContent>
      </Card>

      {/* Recomendación */}
      {comparison.winner && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Trophy className="w-5 h-5" />
              Recomendación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 font-medium mb-2">
              Recomendamos: <strong>{comparison.winner.name}</strong>
            </p>
            <ul className="space-y-1">
              {comparison.reasons.map((reason, index) => (
                <li key={index} className="text-green-600 text-sm">
                  • {reason}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
