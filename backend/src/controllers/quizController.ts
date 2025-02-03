import { Request, Response } from 'express';
import { Quiz } from '../models/Quiz';
import Progress from '../models/Progress'; // Changed to default import

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, questions, chapterId } = req.body;
    
    // Validate question structure
    if (!Array.isArray(questions) || !questions.every(isValidQuestion)) {
      return res.status(400).json({ error: 'Invalid question format' });
    }

    const quiz = await Quiz.create({
      title,
      questions: questions as QuizQuestion[],
      chapterId,
      createdBy: req.user!.id
    });

    res.status(201).json(quiz);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      error: 'Quiz creation failed',
      details: message
    });
  }
};

export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findByPk(quizId);
    
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Type guard for questions
    const questions = quiz.questions as QuizQuestion[];
    const totalQuestions = questions.length;
    let correct = 0;
    
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });

    const score = (correct / totalQuestions) * 100;

    await Progress.create({
      userId: req.user!.id,
      quizId: quiz.id,
      chapterId: quiz.chapterId,
      score
    });

    res.json({ 
      score: Math.round(score),
      totalQuestions,
      correct
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      error: 'Quiz submission failed',
      details: message
    });
  }
};

// Helper function for question validation
const isValidQuestion = (q: any): q is QuizQuestion => {
  return typeof q?.question === 'string' &&
         Array.isArray(q?.options) &&
         typeof q?.correctAnswer === 'string';
};