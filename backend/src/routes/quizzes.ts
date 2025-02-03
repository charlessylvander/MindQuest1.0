import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { createQuiz, submitQuiz } from '../controllers/quizController';

const router = express.Router();

// Teacher routes
router.post('/', authMiddleware(['teacher']), createQuiz);

// Student routes
router.post('/:id/submit', authMiddleware(['enterprise_student', 'private_student']), submitQuiz);

export default router;