import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { getMenu } from '../api';
import { useCart } from '../stores/cartStore';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  availability: boolean;
}

interface SortOption {
  label: string;
  value: keyof MenuItem;
  direction: 'asc' | 'desc';
}

const ITEMS_PER_PAGE = 6;

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [displayedItems, setDisplayedItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>({
    label: 'Name (A-Z)',
    value: 'name',
    direction: 'asc'
  });
  const { addToCart } = useCart();
  const loadingRef = useRef(null);

  const categories = ['all', 'Appetizers', 'Main Course', 'Desserts', 'Beverages'];
  const sortOptions: SortOption[] = [
    { label: 'Name (A-Z)', value: 'name', direction: 'asc' },
    { label: 'Name (Z-A)', value: 'name', direction: 'desc' },
    { label: 'Price (Low to High)', value: 'price', direction: 'asc' },
    { label: 'Price (High to Low)', value: 'price', direction: 'desc' }
  ];

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

  useEffect(() => {
    let filtered = [...menuItems];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortOption.value];
      const bValue = b[sortOption.value];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOption.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortOption.direction === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    // Update pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    setHasMore(page < totalPages);
    
    // Update displayed items
    setDisplayedItems(filtered.slice(0, page * ITEMS_PER_PAGE));
  }, [menuItems, selectedCategory, searchQuery, sortOption, page]);

  useInfiniteScroll(
    () => setPage(prev => prev + 1),
    loadingRef.current,
    hasMore
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

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
      
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="text-gray-400" />
            <select
              value={`${sortOption.value}-${sortOption.direction}`}
              onChange={(e) => {
                const [value, direction] = e.target.value.split('-');
                setSortOption(sortOptions.find(opt => 
                  opt.value === value && opt.direction === direction
                ) || sortOptions[0]);
              }}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
            >
              {sortOptions.map((opt) => (
                <option key={`${opt.value}-${opt.direction}`} value={`${opt.value}-${opt.direction}`}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-full capitalize transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-rose-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-rose-100 dark:hover:bg-rose-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {displayedItems.map(item => (
            <motion.div
              key={item._id}
              variants={itemVariants}
              layout
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow transform hover:scale-105 duration-300"
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
                  className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    item.availability
                      ? 'bg-rose-500 hover:bg-rose-600 text-white'
                      : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                  }`}
                >
                  <Plus className="w-5 h-5" />
                  {item.availability ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Loading indicator for infinite scroll */}
      {hasMore && (
        <div ref={loadingRef} className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-500"></div>
        </div>
      )}
    </div>
  );
}