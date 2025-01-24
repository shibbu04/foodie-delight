import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getOrders } from '../api';
import { Clock } from 'lucide-react';

interface OrderItem {
  menuItem: {
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  deliveryAddress: string;
  createdAt: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        toast.error('Failed to fetch orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Confirmed': 'bg-blue-100 text-blue-800',
      'Preparing': 'bg-purple-100 text-purple-800',
      'Out for Delivery': 'bg-indigo-100 text-indigo-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center">
        <Clock className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Orders Yet</h2>
        <p className="text-gray-600 dark:text-gray-400">Your order history will appear here</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Orders</h1>
      
      <div className="space-y-6">
        {orders.map(order => (
          <div
            key={order._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Delivery Address: {order.deliveryAddress}
                  </p>
                </div>
                <span className="text-lg font-bold text-rose-500">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Items</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                    >
                      <img
                        src={item.menuItem.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                        alt={item.menuItem.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {item.menuItem.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.quantity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}