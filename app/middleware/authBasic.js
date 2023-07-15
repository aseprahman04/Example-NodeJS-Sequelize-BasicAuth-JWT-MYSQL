const db = require("../models");
const User = db.users;
var bcrypt = require("bcryptjs");
/**
 * The above function is a middleware function in JavaScript that performs basic authentication by
 * checking the authorization header, verifying the credentials, and attaching the user to the request
 * object.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as headers, body, and query parameters. It is an object that is passed to the
 * middleware function by the Express framework.
 * @param res - The `res` parameter is the response object. It is used to send the response back to the
 * client.
 * @param next - The `next` parameter is a callback function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically used to move to the next
 * middleware function or to the final route handler.
 * @returns a JSON response with a status code of 401 and a message of "Unauthorized user" if the basic
 * authentication header is missing or does not contain the word "Basic". If the authentication
 * credentials are provided, the function checks if the user exists in the database and if the password
 * is valid. If the user or password is invalid, a JSON response with a status code of 401
 */
const basicAuth = async (req, res, next) => {

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    // verify auth credentials
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    var passwordIsValid = bcrypt.compareSync(
        password,
        user.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
            message: "Invalid login"
        });
    }

    // attach user to request object
    req.user = user

    next();
}
const authBasic = { basicAuth };
module.exports = authBasic;