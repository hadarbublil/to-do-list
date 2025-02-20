import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Task = sequelize.define('Task', {
  task_id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  description: { 
    type: DataTypes.TEXT, 
    defaultValue: "", 
    allowNull: false 
  },
  create_date: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },
  update_date: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  },
  due_date: { 
    type: DataTypes.DATE, 
    allowNull: false 
  },
  assigned_user_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    defaultValue: 1 
  },
  priority_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    defaultValue: 1 
  },
  status_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    defaultValue: 1 
  },
}, {
  timestamps: false, // Since we manually track create_date and update_date
  tableName: 'tasks', 
});

export default Task;
