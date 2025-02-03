import { Request, Response } from 'express';
import User from '../models/User'; // Verify path
import bcrypt from 'bcryptjs';

export const createDeveloper = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const developer = await User.create({
      email,
      password: hashedPassword,
      role: 'developer'
    });

    res.status(201).json(developer);
  } catch (error: any) {
    res.status(500).json({ 
      error: 'Account creation failed',
      details: error.message 
    });
  }
};