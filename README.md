# 🍽️ **FoodieDelight** - *Food Delivery System*

A modern, full-stack food delivery application built using the **MERN stack** (*MongoDB, Express.js, React.js, Node.js*).  

![FoodieDelight Banner](https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80)

---

## ✨ **Features**  
- 🔒 **User Authentication**: Register and Login securely  
- 🍕 **Menu Browsing**: Explore items by category  
- 🛒 **Shopping Cart**: Add, remove, and manage items easily  
- 📦 **Order Tracking**: Real-time updates on orders  
- 🌇 **Theme Support**: Dark and light modes  
- 📱 **Responsive Design**: Works seamlessly on all devices  
- 🚀 **Real-time Updates**: Instant order status updates  

---

## 🛠️ **Tech Stack**  

### **Frontend**  
- ⛒️ React.js (with Vite & TypeScript)  
- 🎨 Tailwind CSS  
- 🧪 Zustand (State Management)  
- 🧠 React Router  
- 🌐 Axios  
- ✨ Lucide React (Icons)  
- 🍞 React Hot Toast  

### **Backend**  
- 🟢 Node.js  
- 🚀 Express.js  
- 📊 MongoDB (with Mongoose ORM)  
- 🔒 JWT Authentication  
- 🔑 Bcrypt.js  
- 🌍 CORS  

---

## 🚀 **Live Demo**

- **Frontend Live URL**: [FoodieDelight Frontend](https://foodie-dlite.vercel.app/)
- **Backend Live URL**: [FoodieDelight Backend](#)

---

## 🛠️ **Installation Guide**  

### **Prerequisites**  
Ensure the following are installed:  
- 📦 Node.js (v14 or higher)  
- 🚢 MongoDB  
- 🛠️ Git  

### **Clone the Repository**  
```bash
git clone https://github.com/shibbu04/foodie-Dlite.git
cd foodie-Dlite
```

### **Backend Setup**  
1. Navigate to the backend directory:  
   ```bash
   cd backend
   ```  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Configure the `.env` file:  
   ```env
   PORT=5000  
   MONGODB_URI=your_mongodb_connection_string  
   JWT_SECRET=your_jwt_secret  
   ```  
4. Seed the database:  
   ```bash
   node src/seed.js
   ```  
5. Start the server:  
   ```bash
   npm start
   ```  

### **Frontend Setup**  
1. Navigate to the frontend directory:  
   ```bash
   cd frontend
   ```  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Start the development server:  
   ```bash
   npm run dev
   ```  

---

## 🌐 **Deployment Guide**  

### **Backend Deployment (Render)**  
1. Create a new Web Service on Render  
2. Connect your GitHub repository  
3. Set up environment variables  
4. Deploy  

### **Frontend Deployment (Vercel)**  
1. Import the project to Vercel  
2. Configure build settings  
3. Add environment variables  
4. Deploy  

---

## 📁 **Project Structure**  

```plaintext
foodie-delight/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── api/
│   └── package.json
└── README.md
```

---

## 🔐 **API Endpoints**  

### **Authentication**  
- `POST /api/auth/register` - Register a new user  
- `POST /api/auth/login` - Login user  

### **Menu Management**  
- `GET /api/menu` - Get all menu items  
- `POST /api/menu` - Add new menu item (Admin)  
- `PUT /api/menu/:id` - Update menu item (Admin)  
- `DELETE /api/menu/:id` - Delete menu item (Admin)  

### **Order Management**  
- `POST /api/orders` - Place a new order  
- `GET /api/orders` - Retrieve user orders  
- `PATCH /api/orders/:id/status` - Update order status (Admin)  

---

## 🔗 **Connect With Me**  

[![Portfolio](https://img.shields.io/badge/Portfolio-%23121011.svg?style=for-the-badge&logo=About.me&logoColor=white)](https://shivam04.tech)  
[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shibbu04)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/shivamsingh57680)  

---

### Made with ❤️ by **Shivam Singh**