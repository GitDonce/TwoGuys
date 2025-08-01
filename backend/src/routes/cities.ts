import express, { Request, Response } from 'express';
import { dataStorage, City } from '../utils/dataStorage';

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
router.get('/:id', (req: Request, res: Response) => {
  try {
    const city = dataStorage.getCityById(req.params.id);
    
    if (!city) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
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

// POST /api/cities - Create new city
router.post('/', (req: Request, res: Response) => {
  const { name, country, description, population, highlights, icon, path, sections } = req.body;
  
  if (!name || !country || !description) {
    return res.status(400).json({
      success: false,
      message: 'Name, country, and description are required'
    });
  }
  
  try {
    const newCity = dataStorage.addCity({
      name,
      country,
      description,
      population: population || '',
      highlights: highlights || [],
      icon: icon || '',
      path: path || `/${name.toLowerCase().replace(/\s+/g, '-')}`,
      sections: sections || []
    });
    
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

// PUT /api/cities/:id - Update city
router.put('/:id', (req: Request, res: Response) => {
  const { name, country, description, population, highlights, icon, path, sections } = req.body;
  
  const updates: Partial<Omit<City, 'id'>> = {};
  if (name) updates.name = name;
  if (country) updates.country = country;
  if (description) updates.description = description;
  if (population) updates.population = population;
  if (highlights) updates.highlights = highlights;
  if (icon) updates.icon = icon;
  if (path) updates.path = path;
  if (sections) updates.sections = sections;
  
  try {
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

// DELETE /api/cities/:id - Delete city
router.delete('/:id', (req: Request, res: Response) => {
  try {
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