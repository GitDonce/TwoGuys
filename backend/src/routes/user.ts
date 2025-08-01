import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Types
interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  population: string;
  highlights: string[];
  icon: string;
  path: string;
  sections: any[];
  userId: string;
}

// Helper function to read cities from file
async function readCities(): Promise<City[]> {
  try {
    const citiesPath = path.join(__dirname, '../../data/cities.json');
    const data = await fs.readFile(citiesPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading cities file:', error);
    return [];
  }
}

// GET /api/user/cities - Get all cities for the logged-in user
router.get('/cities', authenticateToken, async (req, res): Promise<void> => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    const allCities = await readCities();
    const userCities = allCities.filter(city => city.userId === userId);

    res.json({
      success: true,
      data: userCities,
      count: userCities.length
    });

  } catch (error) {
    console.error('Error fetching user cities:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router; 