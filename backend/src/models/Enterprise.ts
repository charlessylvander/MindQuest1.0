import { DataTypes, Model, Optional } from 'sequelize'; // Import Optional
import { sequelize } from '../config/database';
import User from './User';
import Class from './Class';

interface EnterpriseAttributes {
  id: number;
  name: string;
}

interface EnterpriseCreationAttributes extends Optional<EnterpriseAttributes, 'id'> {}

class Enterprise extends Model<EnterpriseAttributes, EnterpriseCreationAttributes> 
  implements EnterpriseAttributes {
  
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public users?: User[];
  public classes?: Class[];
}

Enterprise.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true }
  }
}, {
  sequelize,
  modelName: 'enterprise',
  tableName: 'enterprises',
  timestamps: true
});

// Associations
Enterprise.hasMany(User, {
  foreignKey: 'enterpriseId',
  as: 'users'
});

Enterprise.hasMany(Class, {
  foreignKey: 'enterpriseId',
  as: 'classes'
});

User.belongsTo(Enterprise, {
  foreignKey: 'enterpriseId'
});

Class.belongsTo(Enterprise, {
  foreignKey: 'enterpriseId'
});

export default Enterprise;