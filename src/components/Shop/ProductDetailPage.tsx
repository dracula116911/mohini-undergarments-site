import React, { useEffect, useState } from 'react';
import { Product, getProducts } from '../../lib/supabase';
import { ShoppingCart, Heart, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

interface ProductDetailPageProps {
    product: Product;
    onNavigate: (page: string) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onNavigate }) => {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
    const [showSizeGuide, setShowSizeGuide] = useState(false);

    const handleAddToCart = () => {
        if (product.stock_quantity === 0) {
            toast.error('Product is out of stock');
            return;
        }
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
        setTimeout(() => onNavigate('cart'), 300);
    };

    const handleWishlistToggle = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            toast.success('Removed from wishlist');
        } else {
            addToWishlist(product);
            toast.success('Added to wishlist');
        }
        setTimeout(() => onNavigate('wishlist'), 300);
    };

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const all = await getProducts();
                const filtered = all.filter(
                    (p) => p.id !== product.id && p.category === product.category
                );
                setSuggestedProducts(filtered.slice(0, 4));
            } catch (error) {
                console.error('Error fetching suggestions', error);
            }
        };
        fetchSuggestions();
    }, [product]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Back Button */}
            <button
                onClick={() => onNavigate('shop')}
                className="text-sm text-blue-600 hover:underline mb-6 inline-flex items-center"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Shop
            </button>

            {/* Product Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Image */}
                <div className="w-full h-[500px] max-w-[500px] mx-auto relative overflow-hidden rounded-lg shadow-md">
                    <img
                        src={product.image_url || 'https://via.placeholder.com/500'}
                        alt={product.name}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                </div>


                {/* Info Panel */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{product.name}</h1>
                    <p className="text-sm text-gray-500 mb-3 capitalize">{product.category}</p>
                    <p className="text-2xl font-bold text-gray-800 mb-2">₹{product.price.toLocaleString()}</p>

                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                        <p><span className="font-medium">Size:</span> {product.size}</p>
                        <p><span className="font-medium">Color:</span> {product.color}</p>
                        <p><span className="font-medium">Availability:</span>{' '}
                            <span className={product.stock_quantity === 0 ? 'text-red-500' : 'text-green-600'}>
                                {product.stock_quantity === 0 ? 'Out of Stock' : `In Stock (${product.stock_quantity})`}
                            </span>
                        </p>
                    </div>

                    <p className="text-gray-700 mb-6">{product.description}</p>

                    {/* Size Guide Toggle */}
                    <div className="mb-6">
                        <button
                            onClick={() => setShowSizeGuide(!showSizeGuide)}
                            className="text-sm text-blue-600 hover:underline flex items-center"
                        >
                            Size Guide {showSizeGuide ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
                        </button>
                        {showSizeGuide && (
                            <div className="mt-2 bg-blue-50 text-sm text-gray-600 border border-blue-200 p-4 rounded-lg shadow-inner">
                                <p className="mb-2 font-medium">Bra Size Chart (Bust in inches):</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>XS – 30-32”</li>
                                    <li>S – 32-34”</li>
                                    <li>M – 34-36”</li>
                                    <li>L – 36-38”</li>
                                    <li>XL – 38-40”</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center space-x-4">
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock_quantity === 0}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300"
                        >
                            {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>

                        <button
                            onClick={handleWishlistToggle}
                            className="bg-pink-100 text-pink-700 px-6 py-2 rounded-lg hover:bg-pink-200 transition"
                        >
                            {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Suggested Products */}
            {suggestedProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">You may also like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {suggestedProducts.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => onNavigate('product', item)} // ✅ pass clicked item here
                                className="cursor-pointer bg-white rounded-lg border hover:shadow-lg transition"
                            >
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                                    <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                                    <p className="text-md font-bold text-gray-800 mt-1">₹{item.price}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;
