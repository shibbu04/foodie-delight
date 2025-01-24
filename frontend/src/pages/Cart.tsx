import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../stores/cartStore';
import { createOrder } from '../api';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!address.trim()) {
      toast.error('Please enter a delivery address');
      return;
    }

    setIsLoading(true);
    try {
      const orderData = {
        items: items.map(item => ({
          menuItem: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount,
        deliveryAddress: address
      };

      await createOrder(orderData);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Add some delicious items to your cart!</p>
        <button
          onClick={() => navigate('/menu')}
          className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center gap-4"
            >
              <img
                src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                <p className="text-rose-500 font-medium">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item._id, Math.max(0, item.quantity - 1))}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Delivery Fee</span>
              <span>$5.00</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${(totalAmount + 5).toFixed(2)}</span>
              </div>
            </div>
            <div className="pt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Delivery Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 dark:bg-gray-700 dark:text-white"
                rows={3}
                required
              />
            </div>
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}