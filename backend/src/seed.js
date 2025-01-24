import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Menu from './models/Menu.js';

dotenv.config();

const sampleProducts = [
  // Appetizers
  {
    name: "Crispy Spring Rolls",
    description: "Vegetable-filled crispy rolls served with sweet chili sauce",
    category: "Appetizers",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947",
    availability: true
  },
  {
    name: "Bruschetta",
    description: "Toasted bread topped with tomatoes, garlic, and fresh basil",
    category: "Appetizers",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f",
    availability: true
  },
  {
    name: "Buffalo Wings",
    description: "Spicy chicken wings served with blue cheese dip",
    category: "Appetizers",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1608039755401-742074f0548d",
    availability: true
  },
  {
    name: "Spinach Artichoke Dip",
    description: "Creamy dip served with tortilla chips",
    category: "Appetizers",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7",
    availability: true
  },
  {
    name: "Calamari Rings",
    description: "Crispy fried squid rings with marinara sauce",
    category: "Appetizers",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
    availability: true
  },

  // Main Course
  {
    name: "Grilled Salmon",
    description: "Fresh salmon with lemon butter sauce and seasonal vegetables",
    category: "Main Course",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
    availability: true
  },
  {
    name: "Beef Tenderloin",
    description: "Premium cut beef with red wine reduction",
    category: "Main Course",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1558030006-450675393462",
    availability: true
  },
  {
    name: "Mushroom Risotto",
    description: "Creamy Italian rice with wild mushrooms and parmesan",
    category: "Main Course",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
    availability: true
  },
  {
    name: "Chicken Marsala",
    description: "Pan-seared chicken in marsala wine sauce",
    category: "Main Course",
    price: 21.99,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    availability: true
  },
  {
    name: "Vegetable Curry",
    description: "Mixed vegetables in aromatic curry sauce with basmati rice",
    category: "Main Course",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
    availability: true
  },

  // Desserts
  {
    name: "Tiramisu",
    description: "Classic Italian coffee-flavored dessert",
    category: "Desserts",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
    availability: true
  },
  {
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center",
    category: "Desserts",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    availability: true
  },
  {
    name: "New York Cheesecake",
    description: "Classic cheesecake with berry compote",
    category: "Desserts",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad",
    availability: true
  },
  {
    name: "Crème Brûlée",
    description: "French vanilla custard with caramelized sugar",
    category: "Desserts",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc",
    availability: true
  },
  {
    name: "Apple Pie",
    description: "Homemade pie with vanilla ice cream",
    category: "Desserts",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1568571780765-9276235f1e3d",
    availability: true
  },

  // Beverages
  {
    name: "Fresh Fruit Smoothie",
    description: "Blend of seasonal fruits",
    category: "Beverages",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625",
    availability: true
  },
  {
    name: "Iced Latte",
    description: "Espresso with cold milk and ice",
    category: "Beverages",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
    availability: true
  },
  {
    name: "Green Tea",
    description: "Premium Japanese green tea",
    category: "Beverages",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
    availability: true
  },
  {
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice",
    category: "Beverages",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423",
    availability: true
  },
  {
    name: "Sparkling Water",
    description: "Premium sparkling mineral water",
    category: "Beverages",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1603394151492-28730e473f78",
    availability: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing menu items
    await Menu.deleteMany({});
    console.log('Cleared existing menu items');

    // Insert sample products
    await Menu.insertMany(sampleProducts);
    console.log('Sample products added successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();