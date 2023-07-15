const jwtVerify = require("./jwtVerify");
const verifySignUp = require("./verifySignup");
const authBasic = require("./authBasic");
module.exports = {
    verifySignUp,
    jwtVerify,
    authBasic
};