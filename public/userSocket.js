const redis = require('../utils/redis');
const jwtManager = require('../utils/jwtManager')
const orgUser = require('../models/OrgUser');
const nameSpaceConstant = require('../constants/socketsNamespace');
// const operationConst = require('../constants/operationId');

/**
 * @param {import ("socket.io").Server} io
 */

function registerUserSocket(io) {
  const user = io.of(nameSpaceConstant.USER);


  user.use(async function (socket, next) {
    try {
      console.log('user middleware connected');
      let token = await redis.getKeyValue((socket.id).split("#")[1]);
      jwtManager.validateJWT(token).then(async (result) => {
        socket.user = await orgUser.getUserByEmail(result.email);
        return next();
      }).catch((err) => {
        return next(new Error('authentication error'));
      });
    }
    catch (err) {
      console.log(err);
      return next(new Error('authentication error'));
    }
  });

  user.on("connection", socket => {
    console.log("user connected", socket.id);
    // let groupOperations = [operationConst.CREATE_GROUP, operationConst.INVITE_USER,]
    // let user = socket.user;
    // let userPrivileges = user.operationUserMaps.filter((operationMap) => groupOperations.includes(operationMap.operationId));
    // for (let userPrivilege of userPrivileges) {
    //   if (userPrivilege.privilege.asJson().length > 0) {
    //     socket.join(`${user.org.domainName}#group`)
    //     console.log('joined the Room');
    //     break;
    //   }
    // }
  });


}




exports.registerUserSocket = registerUserSocket;
