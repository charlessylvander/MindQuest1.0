import express from 'express';
import { authMiddleware } from '../middleware/auth';
import { 
  deleteEnterprise,
  manageEnterpriseMembers,
  manageClassMembers
} from '../controllers/helpdeskController';

const router = express.Router();

// Enterprise management
router.delete('/enterprises/:id', authMiddleware(['helpdesk', 'developer']), deleteEnterprise);
router.post('/enterprises/:enterpriseId/members', 
  authMiddleware(['helpdesk', 'developer']), 
  manageEnterpriseMembers
);

// Class member management
router.post('/classes/:classId/members',
  authMiddleware(['helpdesk', 'developer']),
  manageClassMembers
);

export default router;