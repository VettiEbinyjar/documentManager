const jsonwebtoken = {};
// const jwt = require("jsonwebtoken");
// const config = require("kvell-scripts/config");
// const redis = require('../utils/redis');
const authServer = require('./auth-server');
// const jwtHead = {
// algorithm: "HS256",
// expiresIn: "7d"
// };

// jsonwebtoken.generateJWT = (email, userId = '', isDiff = false) => new Promise((resolve, reject) => {
//   let token;
//   try {
//     token = jwt.sign({ userId, email }, isDiff ? config.JWT_EMAIL_KEY : config.JWT_SECRET_KEY, jwtHead);
//     redis.setKeyValueWithExp(email, token, 604800).then((data) => { // 604800 seconds equals to 7 days
//       if (data === 'OK') return resolve(token)
//       // return reject();
//     }, err => {
//       throw err
//     });
//   } catch (error) {
//     console.log('JWT ERROR::::::', error.message);
//     return reject(error)
//   }
// });

jsonwebtoken.generateJWT = (email, userId = '', isDiff = false,userAgent={}) => new Promise((resolve, reject) => {
  authServer.generate('dl', { email, userId,userAgent }, isDiff).then(response => {
    resolve(response.data.token);
  }, err => {
    console.log(err);
    return reject(err);
  })
})


// jsonwebtoken.validateJWT = (token, isDiff = false) => new Promise((resolve, reject) => {
//   try {
//     const payload = jwt.verify(token, isDiff ? config.JWT_EMAIL_KEY : config.JWT_SECRET_KEY);
//     if (payload) {
//       redis.getKeyValue(payload.email).then((data) => {
//         // to manage sessions. write here.
//         // if(token===data) allow else disallow
//         if (data) return resolve(payload); else {
//           console.log('revoked: not in redis');
//           return reject(false)
//         }
//       }, err => { console.log(err); return reject(err) });
//     } else {
//       // most likely never happen
//       console.log('payload fail');
//       return reject(false)
//     }
//   } catch (err) {
//     console.log(err.name === 'TokenExpiredError');
//     return reject(err.message);
//   }
// });

jsonwebtoken.validateJWT = (token, isDiff = false) => new Promise((resolve, reject) => {
  authServer.verify(token, isDiff).then(response => {
    return resolve(response.data.payload);
  }, err => {
    console.log(err);
    reject(err)
  })
})

module.exports = jsonwebtoken;