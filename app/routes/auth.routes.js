const { jwtVerify, authBasic, verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.post(
        "/v1/user",
        [authBasic.basicAuth, jwtVerify.verifyToken, jwtVerify.isBoard, verifySignUp.checkDuplicateUsernameOrEmail],
        controller.signup
    );

    app.post(
        "/v1/auth/login",
        [authBasic.basicAuth],
        controller.signin
    );

    app.get(
        "/v1/auth/logout",
        [authBasic.basicAuth, jwtVerify.verifyToken,],
        controller.signOut
    );
};