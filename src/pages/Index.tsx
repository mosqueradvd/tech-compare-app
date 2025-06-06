
import { useState, useMemo } from 'react';
import { Product, Comparison } from '@/types/product';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ComparisonTable } from '@/components/ComparisonTable';
import { ProductSearch } from '@/components/ProductSearch';
import { useFavorites } from '@/hooks/useFavorites';
import { compareSpecs } from '@/utils/comparison';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Zap, Trophy, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedProduct1, setSelectedProduct1] = useState<Product | null>(null);
  const [selectedProduct2, setSelectedProduct2] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const handleProductSelect = (product: Product) => {
    if (!selectedProduct1) {
      setSelectedProduct1(product);
      toast({
        title: "Producto seleccionado",
        description: `${product.name} seleccionado como primer producto`,
      });
    } else if (!selectedProduct2 && product.id !== selectedProduct1.id) {
      setSelectedProduct2(product);
      toast({
        title: "Comparación lista",
        description: "¡Ahora puedes ver la comparación completa!",
      });
    } else if (product.id === selectedProduct1.id) {
      setSelectedProduct1(null);
      toast({
        title: "Producto deseleccionado",
        description: "Primer producto removido de la comparación",
      });
    } else if (selectedProduct2 && product.id === selectedProduct2.id) {
      setSelectedProduct2(null);
      toast({
        title: "Producto deseleccionado", 
        description: "Segundo producto removido de la comparación",
      });
    } else {
      // Reemplazar producto
      if (selectedProduct2) {
        setSelectedProduct1(product);
        setSelectedProduct2(null);
      } else {
        setSelectedProduct2(product);
      }
      toast({
        title: "Producto reemplazado",
        description: `${product.name} reemplazó un producto en la comparación`,
      });
    }
  };

  const handleSaveComparison = () => {
    if (!selectedProduct1 || !selectedProduct2) return;

    const comparisonId = `${selectedProduct1.id}-${selectedProduct2.id}-${Date.now()}`;
    
    if (isFavorite(comparisonId)) {
      removeFavorite(comparisonId);
      toast({
        title: "Comparación removida",
        description: "La comparación ha sido removida de favoritos",
      });
    } else {
      const comparison: Comparison = {
        id: comparisonId,
        product1: selectedProduct1,
        product2: selectedProduct2,
        createdAt: new Date().toISOString(),
        recommendation: compareSpecs(selectedProduct1, selectedProduct2)
      };
      
      addFavorite(comparison);
      toast({
        title: "Comparación guardada",
        description: "La comparación ha sido añadida a favoritos",
      });
    }
  };

  const clearComparison = () => {
    setSelectedProduct1(null);
    setSelectedProduct2(null);
    toast({
      title: "Comparación limpiada",
      description: "Puedes seleccionar nuevos productos para comparar",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TechCompare
                </h1>
                <p className="text-gray-600 text-sm">Compara productos tecnológicos</p>
              </div>
            </div>
            <Badge variant="outline" className="hidden sm:flex">
              {products.length} productos disponibles
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="compare" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="compare" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Comparar
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Favoritos ({favorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compare" className="space-y-6">
            {/* Productos Seleccionados */}
            {(selectedProduct1 || selectedProduct2) && (
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-blue-600" />
                      Productos Seleccionados
                    </CardTitle>
                    <Button onClick={clearComparison} variant="outline" size="sm">
                      Limpiar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg bg-white">
                      {selectedProduct1 ? (
                        <div>
                          <img src={selectedProduct1.image} alt={selectedProduct1.name} className="w-16 h-16 object-cover rounded mx-auto mb-2" />
                          <h3 className="font-medium">{selectedProduct1.name}</h3>
                          <p className="text-sm text-gray-600">{selectedProduct1.brand}</p>
                        </div>
                      ) : (
                        <div className="text-gray-400 py-8">
                          <p>Selecciona el primer producto</p>
                        </div>
                      )}
                    </div>
                    <div className="text-center p-4 border rounded-lg bg-white">
                      {selectedProduct2 ? (
                        <div>
                          <img src={selectedProduct2.image} alt={selectedProduct2.name} className="w-16 h-16 object-cover rounded mx-auto mb-2" />
                          <h3 className="font-medium">{selectedProduct2.name}</h3>
                          <p className="text-sm text-gray-600">{selectedProduct2.brand}</p>
                        </div>
                      ) : (
                        <div className="text-gray-400 py-8">
                          <p>Selecciona el segundo producto</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tabla de Comparación */}
            {selectedProduct1 && selectedProduct2 && (
              <ComparisonTable 
                product1={selectedProduct1}
                product2={selectedProduct2}
                onSaveComparison={handleSaveComparison}
                isFavorite={isFavorite(`${selectedProduct1.id}-${selectedProduct2.id}-${Date.now()}`)}
              />
            )}

            {/* Búsqueda y Filtros */}
            <ProductSearch 
              onSearch={setSearchQuery}
              onCategoryFilter={setCategoryFilter}
            />

            {/* Grid de Productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={handleProductSelect}
                  isSelected={selectedProduct1?.id === product.id || selectedProduct2?.id === product.id}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-gray-500">No se encontraron productos con los filtros seleccionados.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            {favorites.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes comparaciones favoritas</h3>
                  <p className="text-gray-500">Guarda tus comparaciones favoritas para acceder a ellas rápidamente.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {favorites.map(comparison => (
                  <Card key={comparison.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{comparison.product1.name} vs {comparison.product2.name}</span>
                        <Button 
                          onClick={() => removeFavorite(comparison.id)}
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          Remover
                        </Button>
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        Guardado el {new Date(comparison.createdAt).toLocaleDateString('es-ES')}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={comparison.product1.image} 
                            alt={comparison.product1.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium">{comparison.product1.name}</h4>
                            <p className="text-sm text-gray-600">${comparison.product1.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <img 
                            src={comparison.product2.image} 
                            alt={comparison.product2.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium">{comparison.product2.name}</h4>
                            <p className="text-sm text-gray-600">${comparison.product2.price}</p>
                          </div>
                        </div>
                      </div>
                      {comparison.recommendation.winner && (
                        <div className="mt-4 p-3 bg-green-50 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Recomendado:</strong> {comparison.recommendation.winner.name}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">TechCompare</span>
          </div>
          <p className="text-gray-400 text-sm">
            Aplicación desarrollada con React, TypeScript y Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
