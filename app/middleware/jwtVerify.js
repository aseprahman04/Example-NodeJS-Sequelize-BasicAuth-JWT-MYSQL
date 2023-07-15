const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;

/* The `verifyToken` function is a middleware function used for authentication in a Node.js
application. It takes in the `req` (request), `res` (response), and `next` parameters. */
const verifyToken = (req, res, next) => {
    try {
        let token = req.query["token"];

        if (!token) {
            return res.status(401).send({
                message: "Unauthorized user"
            });
        }
        console.log(req)

        jwt.verify(token,
            config.secret,
            async (err, decoded) => {
                if (err) {
                    return res.status(401).send({
                        message: "Unauthorized user",
                    });
                }

                const user = await User.findOne({ where: { id: req.user.username } });
                if (user) {

                    if (!user.token) {
                        res.status(401).send({
                            message: "Unauthorized user"
                        });
                        return;
                    }

                }
                next();
            });
    } catch (err) {
        throw new Error(err)
    }
};

/* The `isBoard` function is a middleware function used for authorization in a Node.js application. It
takes in the `req` (request), `res` (response), and `next` parameters. */
const isBoard = async (req, res, next) => {
    try {

        const user = await User.findOne({ where: { username: req.user.username } });
        if (user) {
            if (user?.profile === 'board') {
                next();
                return;
            }
            res.status(401).send({
                message: "Unauthorized user"
            });
            return;
        }
    } catch (err) {
        throw new Error(err)
    }
};

/* The `isExpert` function is a middleware function used for authorization in a Node.js application. It
checks if the user making the request has the "expert" profile. */
const isExpert = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { username: req.user.username } });
        if (user) {
            if (user?.profile === 'expert') {
                next();
                return;
            }

            res.status(401).send({
                message: "Unauthorized user"
            });
            return;
        }
    } catch (err) {
        throw new Error(err)
    }
};

/* The `isTrainer` function is a middleware function used for authorization in a Node.js application.
It checks if the user making the request has the "trainer" profile. */
const isTrainer = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { username: req.user.username } });;
        if (user) {
            if (user?.profile === 'trainer') {
                next();
                return;
            }
            res.status(401).send({
                message: "Unauthorized user"
            });
            return;
        }
    } catch (err) {
        throw new Error(err)
    }
};

/* The `isCompetitor` function is a middleware function used for authorization in a Node.js
application. It checks if the user making the request has the "competitor" profile. */
const isCompetitor = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { username: req.user.username } });;
        if (user) {
            if (user?.profile === 'competitor') {
                next();
                return;
            }
            res.status(401).send({
                message: "Unauthorized user"
            });
            return;
        }
    } catch (err) {
        throw new Error(err)
    }
};



const jwtVerify = { verifyToken, isBoard, isCompetitor, isExpert, isTrainer };
module.exports = jwtVerify;