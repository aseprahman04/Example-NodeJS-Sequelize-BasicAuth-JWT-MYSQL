
module.exports = function (app) {
    const skills = require("../controllers/skills.controller.js");
    const { jwtVerify, authBasic } = require("../middleware");
    var router = require("express").Router();
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Create a new Skills

    // Retrieve all skills
    router.get("/", [authBasic.basicAuth, jwtVerify.verifyToken], skills.findAll);

    app.use('/v1/skills', router)
}