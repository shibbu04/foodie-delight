import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getMenu } from '../api';
import { useCart } from '../stores/cartStore';
import { Plus } from 'lucide-react';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  availability: boolean;
}

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  const categories = ['all', 'Appetizers', 'Main Course', 'Desserts', 'Beverages'];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu();
        setMenuItems(data);
      } catch (error) {
        toast.error('Failed to fetch menu items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredItems = menuItems.filter(
    item => selectedCategory === 'all' || item.category === selectedCategory
  );

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Menu</h1>
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full capitalize ${
              selectedCategory === category
                ? 'bg-rose-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-rose-100 dark:hover:bg-rose-900'
            } transition-colors`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {item.description}
                  </p>
                </div>
                <span className="text-lg font-bold text-rose-500">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => {
                  addToCart(item);
                  toast.success(`Added ${item.name} to cart`);
                }}
                disabled={!item.availability}
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg ${
                  item.availability
                    ? 'bg-rose-500 hover:bg-rose-600 text-white'
                    : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                } transition-colors`}
              >
                <Plus className="w-5 h-5" />
                {item.availability ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}