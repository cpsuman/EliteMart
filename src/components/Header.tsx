import React from 'react';
import { ShoppingCart, Search, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

interface HeaderProps {
  onAuthClick: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const { state } = useCart();
  const { user, signOut } = useAuth();
  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => onAuthClick('home')}>
            ShopHub
          </h1>
          
          <div className="flex-1 mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative cursor-pointer">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
            {user && (
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 hover:text-gray-200"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};