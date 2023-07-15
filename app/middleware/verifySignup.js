const db = require("../models");
const User = db.users;

/**
 * The function `checkDuplicateUsernameOrEmail` checks if a given username or email is already in use
 * by querying the database and returns an error message if a duplicate is found.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the Express `Response` object and has methods like `status()` and
 * `send()` that are used to set the HTTP status code and send the response body respectively.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used when you want to move to the next
 * middleware function after completing some operations in the current middleware function.
 * @returns In this code, if a duplicate username is found, the function will return a response with
 * status code 400 and a message indicating that the username is already in use. If a duplicate email
 * is found, the function will also return a response with status code 400 and a message indicating
 * that the email is already in use. If no duplicates are found, the function will not return anything
 * and will continue
 */
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }
        const useremail = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (useremail) {
            res.status(400).send({
                message: "Failed! Email is already in use!"
            });
            return;
        }
        next()
    } catch (err) {
        throw new Error(err)
    }
};




const verifySignUp = {
    checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;