const redis = require("../utils/redis");
const jwtManager = require("../utils/jwtManager");
const orgUser = require("../models/OrgUser");
const nameSpaceConstant = require("../constants/socketsNamespace");
// const operationConst = require("../constants/operationId");

/**
 * @param {import ("socket.io").Server} io
 */
function registerSettingsSocket(io) {
  const settings = io.of(nameSpaceConstant.SETTINGS);

  settings.use(async (socket, next) => {
    try {
      console.log("settings middleware connected");
      const token = await redis.getKeyValue(socket.id.split("#")[1]);
      const parsedJWTObject = await jwtManager.validateJWT(token);
      socket.user = await orgUser.getUserByEmail(parsedJWTObject.email);
      return next();
    } catch (error) {
      console.log(error);
      return next(new Error("Authentication error"));
    }
  });

  settings.on("connection", socket => {
    console.log("Settings socket connected");
    // Manage privileges
    const user = socket.user;
    if (user) {
      socket.join(`${user.org.domainName}#settings`);
      console.log("Joined the room");
    }
  });
}

exports.registerSettingsSocket = registerSettingsSocket;
