//eslint-disable-next-line no-unused-vars
const sequelize = require("kvell-db-plugin-sequelize").dbInstance;
const Sequelize = require("kvell-db-plugin-sequelize").dbLib;
const shortid = require('shortid');

const privilege = sequelize.define(
  "privilege",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    privilegeId: { type: Sequelize.STRING, primaryKey: true },
    create: { type: Sequelize.BOOLEAN, allowNull: false },
    share: { type: Sequelize.BOOLEAN, allowNull: false },
    delete: { type: Sequelize.BOOLEAN, allowNull: false },
    edit: { type: Sequelize.BOOLEAN, allowNull: false },
    view: { type: Sequelize.BOOLEAN, allowNull: false }
  },
  {
    hooks: {
      beforeCreate: async data => {
        data.privilegeId = `privilege_${shortid.generate()}`;
      }
    }
  }
);

privilege.prototype.asJson = function () {
  return {
    create: this.create,
    view: this.view,
    edit: this.edit,
    delete: this.delete,
    share: this.share
  }
}


module.exports = privilege;
