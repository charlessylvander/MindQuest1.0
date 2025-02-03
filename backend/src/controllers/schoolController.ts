import { Request, Response } from 'express';
import { validateRequestBody } from '../utils/apiUtils';
import User from '../models/User';
import Class from '../models/Class';

export const createTeacher = async (req: Request, res: Response) => {
  const error = validateRequestBody(req.body, ['email', 'password']);
  if (error) return res.status(400).json({ message: error });

  try {
    const teacher = await User.create({
      ...req.body,
      role: 'teacher',
      enterpriseId: req.user?.enterpriseId
    });
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Teacher creation failed' });
  }
};

export const createClass = async (req: Request, res: Response) => {
  try {
    const newClass = await Class.create({
      name: req.body.name,
      enterpriseId: req.user?.enterpriseId
    });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Class creation failed' });
  }
};