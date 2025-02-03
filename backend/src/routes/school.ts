import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { createTeacher, createClass } from '../controllers/schoolController';

const router = express.Router();

// School Enterprise routes
router.post('/teachers', authMiddleware(['school']), createTeacher);
router.post('/classes', authMiddleware(['school']), createClass);

export default router;