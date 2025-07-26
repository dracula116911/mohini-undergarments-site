// components/Shop/ProductGrid.tsx
import React, { useState, useEffect } from 'react';
import { Product, getProducts } from '../../lib/supabase';
import { ShoppingCart, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductGridProps {
  onNavigate: (page: string, product?: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onNavigate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const categories = ['all', 'bra', 'sports-bra', 'panties', 'full-combo'];
  const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedSize !== 'all') {
      filtered = filtered.filter(p => p.size === selectedSize);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        default: return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedSize, searchTerm, sortBy]);

  const handleWishlistToggle = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="md:col-span-2 px-4 py-2 border rounded"
        />
        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="px-4 py-2 border rounded">
          {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
        </select>
        <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)} className="px-4 py-2 border rounded">
          {sizes.map(size => <option key={size} value={size}>{size === 'all' ? 'All Sizes' : size}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-4 py-2 border rounded">
          <option value="name">Name</option>
          <option value="price-low">Price Low to High</option>
          <option value="price-high">Price High to Low</option>
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            onClick={() => onNavigate('product', product)}
            className="group relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
          >
            <img src={product.image_url} alt={product.name} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" />
            <button
              onClick={e => handleWishlistToggle(product, e)}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-pink-100"
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'text-pink-500' : 'text-gray-500'}`} />
            </button>
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{product.category} • Size: {product.size}</p>
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-gray-900">₹{product.price}</p>
                <button
                  onClick={e => handleAddToCart(product, e)}
                  disabled={product.stock_quantity === 0}
                  className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
                >
                  {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
