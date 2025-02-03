import { Request, Response } from 'express';
import User from '../models/User';
import Enterprise from '../models/Enterprise';
import Class from '../models/Class';
import { WhereOptions } from 'sequelize';

// Add interface for enterprise destruction
interface EnterpriseDeletionOptions {
  where: { id: string };
  include: Array<{
    model: typeof User;
    where: WhereOptions;
  }>;
}

export const deleteEnterprise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const deletionOptions: EnterpriseDeletionOptions = {
      where: { id },
      include: [{
        model: User,
        where: { 
          role: ['teacher', 'enterprise_student'] 
        }
      }]
    };

    await Enterprise.destroy(deletionOptions);
    res.status(200).json({ message: 'Enterprise deleted successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      error: 'Enterprise deletion failed',
      details: message
    });
  }
};

export const manageEnterpriseMembers = async (req: Request, res: Response) => {
  try {
    const { enterpriseId } = req.params;
    const { action, userId, role } = req.body;

    const enterprise = await Enterprise.findByPk(enterpriseId);
    if (!enterprise) return res.status(404).json({ error: 'Enterprise not found' });

    switch (action) {
      case 'remove':
        await User.destroy({ 
          where: { 
            id: userId, 
            enterpriseId: enterprise.id // Add type assertion
          } 
        });
        break;
      
      case 'add':
        // Validate required fields
        if (!req.body.email || !req.body.password) {
          return res.status(400).json({ error: 'Missing email or password' });
        }

        await User.create({
          email: req.body.email,
          password: req.body.password,
          role: role as 'teacher' | 'enterprise_student', // Type assertion
          enterpriseId: enterprise.id // Proper typing
        });
        break;

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.status(200).json({ message: 'Operation successful' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ 
      error: 'Member management failed',
      details: message
    });
  }
};