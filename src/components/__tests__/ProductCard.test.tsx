
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from '../ProductCard';
import { Product } from '@/types/product';

const mockProduct: Product = {
  id: 1,
  name: 'Test Phone',
  brand: 'TestBrand',
  category: 'smartphone',
  price: 699,
  image: 'https://example.com/test-image.jpg',
  specs: {
    ram: '8GB',
    storage: '128GB',
  },
  rating: 4.2,
  description: 'A great test phone with excellent features',
};

const mockOnSelect = jest.fn();

describe('ProductCard', () => {
  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} onSelect={mockOnSelect} />);
    
    expect(screen.getByText('Test Phone')).toBeInTheDocument();
    expect(screen.getByText('TestBrand')).toBeInTheDocument();
    expect(screen.getByText('$699')).toBeInTheDocument();
    expect(screen.getByText('4.2')).toBeInTheDocument();
    expect(screen.getByText('smartphone')).toBeInTheDocument();
  });

  it('displays product image with correct alt text', () => {
    render(<ProductCard product={mockProduct} onSelect={mockOnSelect} />);
    
    const image = screen.getByAltText('Test Phone');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.image);
  });

  it('calls onSelect when select button is clicked', () => {
    render(<ProductCard product={mockProduct} onSelect={mockOnSelect} />);
    
    const selectButton = screen.getByText('Seleccionar');
    fireEvent.click(selectButton);
    
    expect(mockOnSelect).toHaveBeenCalledWith(mockProduct);
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('shows "Seleccionado" when product is selected', () => {
    render(<ProductCard product={mockProduct} onSelect={mockOnSelect} isSelected={true} />);
    
    expect(screen.getByText('Seleccionado')).toBeInTheDocument();
    expect(screen.queryByText('Seleccionar')).not.toBeInTheDocument();
  });

  it('applies selected styling when isSelected is true', () => {
    const { container } = render(
      <ProductCard product={mockProduct} onSelect={mockOnSelect} isSelected={true} />
    );
    
    const card = container.firstChild;
    expect(card).toHaveClass('ring-2', 'ring-blue-500', 'bg-blue-50');
  });

  it('does not apply selected styling when isSelected is false', () => {
    const { container } = render(
      <ProductCard product={mockProduct} onSelect={mockOnSelect} isSelected={false} />
    );
    
    const card = container.firstChild;
    expect(card).not.toHaveClass('ring-2', 'ring-blue-500', 'bg-blue-50');
  });

  it('truncates long descriptions', () => {
    const productWithLongDescription = {
      ...mockProduct,
      description: 'This is a very long description that should be truncated when displayed in the product card to maintain consistent layout and readability across all product cards in the grid.',
    };
    
    render(<ProductCard product={productWithLongDescription} onSelect={mockOnSelect} />);
    
    const description = screen.getByText(productWithLongDescription.description);
    expect(description).toHaveClass('line-clamp-2');
  });
});
