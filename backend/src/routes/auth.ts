import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promises as fs } from 'fs';
import path from 'path';

const router = express.Router();

// Types
interface User {
  id: string;
  email: string;
  password: string;
}

// Helper function to read users from file
async function readUsers(): Promise<User[]> {
  try {
    const usersPath = path.join(__dirname, '../../data/users.json');
    const data = await fs.readFile(usersPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

// Helper function to write users to file
async function writeUsers(users: User[]): Promise<void> {
  try {
    const usersPath = path.join(__dirname, '../../data/users.json');
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users file:', error);
    throw error;
  }
}

// Helper function to generate user ID
function generateUserId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// POST /api/auth/register
router.post('/register', async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
      return;
    }

    // Password strength validation (minimum 6 characters)
    if (password.length < 6) {
      res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long' 
      });
      return;
    }

    // Check if user already exists
    const users = await readUsers();
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      res.status(409).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
      return;
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser: User = {
      id: generateUserId(),
      email: email.toLowerCase(),
      password: hashedPassword
    };

    // Add user to the list and save
    users.push(newUser);
    await writeUsers(users);

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
      return;
    }

    // Find user
    const users = await readUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
      return;
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  // Since we're using JWT tokens, logout is handled on the client side
  // by removing the token from storage. We just return a success response.
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

export default router; 