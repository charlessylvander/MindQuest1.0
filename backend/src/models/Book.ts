import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Book extends Model {
  public id!: number;
  public title!: string;
  public isPublic!: boolean;
  public enterpriseId?: number;
}

Book.init({
  title: { type: DataTypes.STRING, allowNull: false },
  isPublic: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { sequelize, modelName: 'book' });

export default Book;