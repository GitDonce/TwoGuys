import express, { Request, Response } from 'express';
import { dataStorage, Item } from '../utils/dataStorage';

const router = express.Router();

// GET /api/items - Get all items
router.get('/', (req: Request, res: Response) => {
  try {
    const items = dataStorage.getAllItems();
    res.json({
      success: true,
      data: items,
      count: items.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve items'
    });
  }
});

// GET /api/items/:id - Get single item
router.get('/:id', (req: Request, res: Response) => {
  try {
    const item = dataStorage.getItemById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve item'
    });
  }
});

// POST /api/items - Create new item
router.post('/', (req: Request, res: Response) => {
  const { title, description } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: 'Title and description are required'
    });
  }
  
  try {
    const newItem = dataStorage.addItem({ title, description });
    
    res.status(201).json({
      success: true,
      data: newItem,
      message: 'Item created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create item'
    });
  }
});

// PUT /api/items/:id - Update item
router.put('/:id', (req: Request, res: Response) => {
  const { title, description, completed } = req.body;
  
  const updates: Partial<Pick<Item, 'title' | 'description' | 'completed'>> = {};
  if (title) updates.title = title;
  if (description) updates.description = description;
  if (typeof completed === 'boolean') updates.completed = completed;
  
  try {
    const updatedItem = dataStorage.updateItem(req.params.id, updates);
    
    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedItem,
      message: 'Item updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update item'
    });
  }
});

// DELETE /api/items/:id - Delete item
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const deletedItem = dataStorage.deleteItem(req.params.id);
    
    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.json({
      success: true,
      data: deletedItem,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete item'
    });
  }
});

export default router; 