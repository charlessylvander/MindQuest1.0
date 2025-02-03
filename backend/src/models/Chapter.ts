import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Chapter extends Model {
  public id!: number;
  public title!: string;
  public order!: number;
  public bookId!: number;
}

Chapter.init({
  title: { type: DataTypes.STRING, allowNull: false },
  order: { type: DataTypes.INTEGER, allowNull: false },
  bookId: { type: DataTypes.INTEGER, allowNull: false }
}, { sequelize, modelName: 'chapter' });

export default Chapter;