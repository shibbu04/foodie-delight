import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Appetizers', 'Main Course', 'Desserts', 'Beverages'],
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model('Menu', menuSchema);