import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// sequelize.sync({ alter: true })
//   .then(() => console.log("Database schema updated"))
//   .catch((error) => console.error("Error updating database:", error));


export default sequelize;
