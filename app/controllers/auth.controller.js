const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Skills = db.skills;
const Joi = require('joi');
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/* The `exports.signup` function is responsible for handling the signup functionality in the
application and do some validation. the response defend on the fullfilled validator. */
exports.signup = async (req, res) => {
    try {
        const { body } = req;

        const signUpSchema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            username: Joi.string().required(),
            password: Joi.string().required(),
            profile: Joi.string().required(),
            skills: Joi.array().optional()

        });
        const result = signUpSchema.validate(body);
        const { error } = result;
        const valid = error == null;
        if (!valid) {
            throw new Error(error)
        } else {
            const user = await User.create({
                ...body,
                password: bcrypt.hashSync(body.password, 8)
            })
            if (user) {
                if (body.skills && body.skills.length > 0) {
                    const skills = await Skills.findAll({
                        where: {
                            skill_name: {
                                [Op.or]: body.skills
                            }
                        }
                    })
                    if (skills) {
                        await user.addSkill(skills, { proficiency: 'Intermediate' });
                        res.status(200).json({
                            message: 'create success',
                        })
                    } else {
                        await user.addSkill([1], { proficiency: 'Intermediate' });
                        res.status(200).json({
                            message: 'create success',
                        })
                    }
                }
            }
        }

    } catch (err) {
        console.log(err)
        res.status(422).json({
            message: 'Data cannot be processed',
        })
    }
};

exports.signin = async (req, res) => {
    try {
        const { body } = req;
        console.log(req)

        const signInSchema = Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().required(),
        });
        const result = signInSchema.validate(body);

        const { error } = result;
        const valid = error == null;

        if (!valid) {
            res.status(422).json({
                message: 'Data cannot be processed'
            })
        } else {
            const user = await User.findOne({
                where: {
                    username: body.username
                }
            })

            if (!user) {
                return res.status(401).send({ message: "Invalid Login." });
            }
            if (user) {
                var passwordIsValid = bcrypt.compareSync(
                    body.password,
                    user.password
                );

                if (!passwordIsValid) {
                    return res.status(401).send({
                        message: "Invalid login"
                    });
                }

                const token = jwt.sign({ id: user.id },
                    config.secret,
                    {
                        algorithm: 'HS256',
                        allowInsecureKeySizes: true,
                        expiresIn: 86400, // 24 hours
                    });

                await User.update({ ...user, token: token }, {
                    where: { id: user.id }
                })

                res.status(200).send({
                    profile: user.profile ?? 'board',
                    token: token
                });

            }
        }

    } catch (err) {
        console.log(err)
        res.status(422).json({
            message: 'Data cannot be processed',
        })
    }

};

exports.signOut = async (req, res) => {
    try {

        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        if (!user) {
            return res.status(401).send({ message: "Invalid Login." });
        }
        if (user) {
            await User.update({ token: null }, {
                where: { id: user.id }
            })

            res.status(200).send({
                message: 'logout success',
            });

        }

    } catch (err) {
        res.status(422).json({
            message: 'Data cannot be processed',
        })
    }

};