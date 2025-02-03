import { 
    Model, DataTypes, 
    BelongsToManyAddAssociationMixin, 
    BelongsToManyRemoveAssociationMixin 
  } from 'sequelize';
  import { sequelize } from '../config/database';
  import User from './User';
  
  interface ClassAttributes {
    id: number;
    name: string;
    enterpriseId: number;
  }
  
  class Class extends Model<ClassAttributes> implements ClassAttributes {
    public id!: number;
    public name!: string;
    public enterpriseId!: number;
  
    // Association methods
    public addUser!: BelongsToManyAddAssociationMixin<User, number>;
    public removeUser!: BelongsToManyRemoveAssociationMixin<User, number>;
  }
  
  Class.init({
    name: DataTypes.STRING,
    enterpriseId: DataTypes.INTEGER
  }, { sequelize, modelName: 'class' });
  
  // Associations
  Class.belongsToMany(User, { through: 'ClassUsers' });
  
  export default Class; // Default export