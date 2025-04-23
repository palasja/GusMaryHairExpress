require('dotenv').config();
var { Sequelize, DataTypes, Op} = require('sequelize');

var sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_ADMIN,
    process.env.MYSQL_ADMIN_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
    port: 3306,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    pool: {
      max: 10,
      min: 0,
    //   acquire: config.pool.acquire,
    //   idle: config.pool.idle
    }
  }
);

const Feedback = sequelize.define("feedback", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
  },
  {
        freezeTableName: true,
        timestamps: false,
    });
const WorkDate = sequelize.define("workDate", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: Sequelize.DATE
  },
},
{
      freezeTableName: true,
      timestamps: false,
  })   
  
const WorkTime = sequelize.define("workTime", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    time: {
      type: Sequelize.TIME
    },
    workDateId:{
      type: Sequelize.INTEGER,
    }
  },
  {
        freezeTableName: true,
        timestamps: false,
    })
WorkDate.hasMany(WorkTime, { as: "time" });
WorkTime.belongsTo(WorkDate, {
  foreignKey: "workDateId",
  as: "date",
});

const Type = sequelize.define("type", 
    {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING
        },
    },
    {
      freezeTableName: true,
      timestamps: false,
})

const Services = sequelize.define("services", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING
  },
  cost:{
    type: Sequelize.INTEGER,
  },
  minCost:{
    type: Sequelize.INTEGER,
  },
  maxCost:{
    type: Sequelize.INTEGER,
  },
  typeId:{
    type: Sequelize.INTEGER,
  },
  descTitle: {
    type: Sequelize.STRING
  },
  descContent: {
    type: Sequelize.STRING
  },
  descComment: {
    type: Sequelize.STRING
  },
},
{
      freezeTableName: true,
      timestamps: false,
  })

Type.hasMany(Services, { as: "type" });
Services.belongsTo(Type, {
  foreignKey: "typeId",
  as: "servicesType",
});

const DescriptionItem = sequelize.define("descriptionItem", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING
  },
  cost:{
    type: Sequelize.INTEGER,
  },
  minCost:{
    type: Sequelize.INTEGER,
  },
  maxCost:{
    type: Sequelize.INTEGER,
  },
  serviceId:{
    type: Sequelize.INTEGER,
  }
},
{
      freezeTableName: true,
      timestamps: false,
})

Services.hasMany(DescriptionItem, { as: "serviceDesc" });
DescriptionItem.belongsTo(Services, {
  foreignKey: "serviceId",
  as: "description",
});

module.exports = {DescriptionItem, Feedback, Type, WorkDate, WorkTime, Services, sequelize}