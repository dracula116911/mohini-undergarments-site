import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { Heart, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface WishlistPageProps {
  onNavigate: (page: string) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ onNavigate }) => {
  const { wishlist :wishlistItems, removeFromWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <Heart className="w-10 h-10 text-pink-400 mx-auto mb-4" />
        <p className="text-lg text-gray-600 mb-4">Your wishlist is empty.</p>
        <button
          onClick={() => onNavigate('shop')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12" >
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-sm">
            <img src={item.image_url} alt={item.name} className="w-full h-64 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-500 text-sm">{item.category}</p>
            <p className="text-gray-700 font-bold mt-2">₹{item.price}</p>
            <button
              onClick={() => {
                removeFromWishlist(item.id);
                toast.success('Removed from wishlist');
              }}
              className="mt-4 text-sm text-red-500 hover:text-red-700 flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-1" /> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
