

module.exports = function (app) {
    const activities = require("../controllers/activities.controller.js");
    const { jwtVerify, authBasic } = require("../middleware");
    var router = require("express").Router();
    router.post("/", [authBasic.basicAuth, jwtVerify.verifyToken, jwtVerify.isExpert,], activities.create);


    // Retrieve all activities by skill id
    router.get("/:skill_id", [authBasic.basicAuth, jwtVerify.verifyToken, jwtVerify.isExpert], activities.findAll);

    // Update a Tutorial with id
    router.put("/:id", [authBasic.basicAuth, jwtVerify.verifyToken, jwtVerify.isExpert], activities.update);

    // Delete a Tutorial with id
    router.delete("/:id", [authBasic.basicAuth, jwtVerify.verifyToken, jwtVerify.isExpert], activities.delete);


    app.use('/v1/activities', router)
}