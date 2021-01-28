//eslint-disable-next-line no-unused-vars
const Sequelize = require("kvell-db-plugin-sequelize").dbLib;
const sequelize = require("kvell-db-plugin-sequelize").dbInstance;
const Org = require("../Org/OrgModel");
const OrgUser = require("../OrgUser/OrgUserModel");

// Create your OrgCreatedUserMap model's schema here and export it.

const OrgCreatedUserMap = sequelize.define(
  "orgCreatedUserMap",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
  },
  {
    timestamps: true
  }
);

OrgCreatedUserMap.belongsTo(Org, { foreignKey: 'orgId' });
OrgCreatedUserMap.belongsTo(OrgUser, { foreignKey: 'userId' });

Org.hasOne(OrgCreatedUserMap, { foreignKey: 'orgId' });
OrgUser.hasOne(OrgCreatedUserMap, { foreignKey: 'userId' });


module.exports = OrgCreatedUserMap