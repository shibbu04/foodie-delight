import express from 'express';
import Menu from '../models/Menu.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items' });
  }
});

// Add new menu item (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const menuItem = new Menu(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating menu item' });
  }
});

// Update menu item (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating menu item' });
  }
});

// Delete menu item (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item' });
  }
});

export default router;