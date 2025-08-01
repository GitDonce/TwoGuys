import express, { Request, Response } from 'express';
import { dataStorage, City } from '../utils/dataStorage';
import { authenticateToken, optionalAuthenticateToken } from '../middleware/auth';

const router = express.Router();

// GET /api/cities - Get all cities
router.get('/', (req: Request, res: Response) => {
  try {
    const cities = dataStorage.getAllCities();
    res.json({
      success: true,
      data: cities,
      count: cities.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve cities'
    });
  }
});

// GET /api/cities/:id - Get single city
router.get('/:id', (req: Request, res: Response): void => {
  try {
    const city = dataStorage.getCityById(req.params.id);
    
    if (!city) {
      res.status(404).json({
        success: false,
        message: 'City not found'
      });
      return;
    }
    
    res.json({
      success: true,
      data: city
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve city'
    });
  }
});

// POST /api/cities - Create new city (requires authentication)
router.post('/', authenticateToken, (req: Request, res: Response): void => {
  const { name, country, description, population, highlights, icon, path, sections } = req.body;
  
  if (!name || !country || !description) {
    res.status(400).json({
      success: false,
      message: 'Name, country, and description are required'
    });
    return;
  }
  
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const newCity = dataStorage.addCity({
      name,
      country,
      description,
      population: population || '',
      highlights: highlights || [],
      icon: icon || '',
      path: path || `/${name.toLowerCase().replace(/\s+/g, '-')}`,
      sections: sections || []
    }, userId);
    
    res.status(201).json({
      success: true,
      data: newCity,
      message: 'City created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create city'
    });
  }
});

// PUT /api/cities/:id - Update city (requires authentication and ownership)
router.put('/:id', authenticateToken, (req: Request, res: Response) => {
  const { name, country, description, population, highlights, icon, path, sections } = req.body;
  
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    // Check if city exists and user owns it
    if (!dataStorage.isCityOwnedByUser(req.params.id, userId)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this city'
      });
    }

    const updates: Partial<Omit<City, 'id'>> = {};
    if (name) updates.name = name;
    if (country) updates.country = country;
    if (description) updates.description = description;
    if (population) updates.population = population;
    if (highlights) updates.highlights = highlights;
    if (icon) updates.icon = icon;
    if (path) updates.path = path;
    if (sections) updates.sections = sections;
    
    const updatedCity = dataStorage.updateCity(req.params.id, updates);
    
    if (!updatedCity) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }
    
    res.json({
      success: true,
      data: updatedCity,
      message: 'City updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update city'
    });
  }
});

// DELETE /api/cities/:id - Delete city (requires authentication and ownership)
router.delete('/:id', authenticateToken, (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    // Check if city exists and user owns it
    if (!dataStorage.isCityOwnedByUser(req.params.id, userId)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this city'
      });
    }

    const deletedCity = dataStorage.deleteCity(req.params.id);
    
    if (!deletedCity) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }
    
    res.json({
      success: true,
      data: deletedCity,
      message: 'City deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete city'
    });
  }
});

export default router; 