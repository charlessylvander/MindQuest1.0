import { DataTypes, Model, Optional } from 'sequelize'; // Import Optional
import { sequelize } from '../config/database';

// Define attribute types
interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: 'developer' | 'helpdesk' | 'school' | 
        'teacher' | 'enterprise_student' | 'private_student';
  enterpriseId?: number | null;
}

// Define creation attributes (optional fields)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> 
  implements UserAttributes {
  
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: UserAttributes['role'];
  public enterpriseId?: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [8, 128] }
  },
  role: {
    type: DataTypes.ENUM(
      'developer',
      'helpdesk',
      'school',
      'teacher',
      'enterprise_student',
      'private_student'
    ),
    allowNull: false
  },
  enterpriseId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  }
}, {
  sequelize,
  modelName: 'user',
  tableName: 'users',
  timestamps: true
});

export default User;