import { Link } from 'react-router-dom';
import { ShoppingCart, Moon, Sun, Menu as MenuIcon, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../stores/authStore';
import { useTheme } from '../stores/themeStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-rose-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                FoodieDelight
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/menu" className="text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
              Menu
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/orders" className="text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  Orders
                </Link>
                <Link to="/cart" className="relative text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400">
                  <ShoppingCart className="w-6 h-6" />
                </Link>
                <button
                  onClick={() => logout()}
                  className="text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400"
            >
              {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400"
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900">
            <Link
              to="/menu"
              className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/orders"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400"
                  onClick={() => setIsOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  to="/cart"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400"
                  onClick={() => setIsOpen(false)}
                >
                  Cart
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-rose-500 hover:text-rose-600"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}