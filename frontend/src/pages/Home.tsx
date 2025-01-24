import { Link } from 'react-router-dom';
import { ArrowRight, UtensilsCrossed, Clock, Truck } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Delicious Food,
              <br />
              Delivered to You
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Choose from a wide variety of cuisines and get your favorite meals delivered right to your doorstep.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition-colors"
            >
              Order Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Why Choose FoodieDelight?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 dark:bg-rose-900 rounded-full mb-4">
              <UtensilsCrossed className="w-8 h-8 text-rose-500 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quality Food</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Partner with the best restaurants to ensure high-quality meals every time.
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 dark:bg-rose-900 rounded-full mb-4">
              <Clock className="w-8 h-8 text-rose-500 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Quick and reliable delivery to get your food while it's still hot.
            </p>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 dark:bg-rose-900 rounded-full mb-4">
              <Truck className="w-8 h-8 text-rose-500 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easy Tracking</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time order tracking to know exactly when your food will arrive.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Featured Restaurants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Italian Delight",
              image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&q=80",
              cuisine: "Italian"
            },
            {
              name: "Sushi Master",
              image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80",
              cuisine: "Japanese"
            },
            {
              name: "Spice Route",
              image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
              cuisine: "Indian"
            }
          ].map((restaurant, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {restaurant.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{restaurant.cuisine} Cuisine</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}