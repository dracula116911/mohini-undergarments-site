import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product, getProducts } from '../../lib/supabase';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

interface FeaturedProductsProps {
  onNavigate: (page: string, product?: Product) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onNavigate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-gray-500">Loading...</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg shadow hover:shadow-lg transition border cursor-pointer"
              onClick={() => onNavigate('product', product)}
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-80 object-cover rounded-t"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleWishlistToggle(product);
                }}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-pink-100"
              >
                <Heart
                  className={`h-5 w-5 ${isInWishlist(product.id) ? 'text-pink-500' : 'text-gray-500'}`}
                />
              </button>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-gray-900 mb-2">₹{product.price}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  disabled={product.stock_quantity === 0}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
                >
                  {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
