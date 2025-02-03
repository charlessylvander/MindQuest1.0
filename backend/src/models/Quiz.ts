import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Chapter } from './Chapter';
import { User } from './User';

export class Quiz extends Model {
  declare id: number;
  declare title: string;
  declare questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  declare chapterId: number;
  declare createdBy: number;
}

Quiz.init({
  title: DataTypes.STRING,
  questions: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  chapterId: {
    type: DataTypes.INTEGER,
    references: { model: Chapter, key: 'id' }
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' }
  }
}, { sequelize, modelName: 'quiz' });

// Associations
Chapter.hasMany(Quiz);
Quiz.belongsTo(Chapter);
User.hasMany(Quiz, { foreignKey: 'createdBy' });