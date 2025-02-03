import express from 'express';
import { createDeveloper } from '../controllers/adminController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/create-developer', authMiddleware(['developer']), createDeveloper);



export default router;