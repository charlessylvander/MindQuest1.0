import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';
import Quiz from './Quiz';

interface ProgressAttributes {
  id: number;
  userId: number;
  quizId: number;
  chapterId: number;
  score: number;
}

class Progress extends Model<ProgressAttributes> implements ProgressAttributes {
  public id!: number;
  public userId!: number;
  public quizId!: number;
  public chapterId!: number;
  public score!: number;
}

Progress.init({
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' }
  },
  quizId: {
    type: DataTypes.INTEGER,
    references: { model: Quiz, key: 'id' }
  },
  chapterId: DataTypes.INTEGER,
  score: {
    type: DataTypes.FLOAT,
    validate: { min: 0, max: 100 }
  }
}, { sequelize, modelName: 'progress' });

export default Progress;