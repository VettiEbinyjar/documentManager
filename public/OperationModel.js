//eslint-disable-next-line no-unused-vars
const sequelize = require("kvell-db-plugin-sequelize").dbInstance;
const Sequelize = require("kvell-db-plugin-sequelize").dbLib;
const shortid = require('shortid');
const Operation = sequelize.define(
  "operation",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    operationId: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    operationName: {
      type: Sequelize.STRING
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      default: true
    }
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async data => {
        data.operationId = `operation_${shortid.generate()}`;
      }
    }
  }
);

Operation.prototype.asJson = function () {
  return {
    id: this.operationId,
    title: this.operationName,
  };
};
module.exports = Operation;
