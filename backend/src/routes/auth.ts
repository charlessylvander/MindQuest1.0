import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) return res.status(401).send('Access denied');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      if (!roles.includes(decoded.role)) throw new Error();
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).send('Invalid permissions');
    }
  };
};