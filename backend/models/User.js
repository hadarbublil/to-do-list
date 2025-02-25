import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true,
    },
    // channel_id: { 
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull: false,
    }, 
}, {
    tableName: 'users',
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        }
    }
});

User.associate = (models) => {
    User.belongsToMany(models.Task, {
        through: 'task_user',
        as: 'tasks',
        foreignKey: 'userId', 
        otherKey: 'taskId', 
    });
};

export default User;
