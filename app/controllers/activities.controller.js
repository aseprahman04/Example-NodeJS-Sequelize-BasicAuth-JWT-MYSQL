const db = require("../models");
const Activities = db.activity;
const Op = db.Sequelize.Op;
const User = db.users;
const Skills = db.skills;
const Joi = require('joi');
const { getPagination, getPagingData } = require("../utils/pagination");

/* The `exports.create` function is responsible for creating a new activity in the database. */
exports.create = async (req, res) => {
    try {
        const { body } = req;
        const activitiesSchema = Joi.object().keys({
            skill: Joi.number().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            startdate: Joi.date().timestamp().required(),
            enddate: Joi.date().timestamp().required().min(Joi.ref('startdate')).required(),
            participants: Joi.array().optional()

        });
        const result = activitiesSchema.validate(body);
        const { error } = result;
        const valid = error == null;

        if (!valid) {
            res.status(422).json({
                message: 'Data cannot be processed'
            })
        } else {
            const activities = await Activities.create({ ...body, skillId: body.skill })
            if (activities) {
                if (body.participants && body.participants.length > 0) {
                    const participants = await User.findAll({
                        where: {
                            id: {
                                [Op.or]: body.participants
                            }
                        }
                    })
                    console.log(participants)

                    if (participants) {
                        await activities.addUser(participants, { proficiency: 'Intermediate' });
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

// Retrieve all Activities by skill id.
exports.findAll = async (req, res) => {
    try {
        const { page, size, sort = 'ASC' } = req.query;
        const { skill_id } = req.params;
        if (!skill_id) {
            res.status(422).json({
                message: 'Data cannot be processed',
            })
        }
      
        const { limit, offset } = getPagination(page, size);

        const data = await Activities.findAndCountAll({ where: { skillId: skill_id }, limit, offset, order: [['startdate', sort]], include: [{ model: User, required: false, attributes: ['id', 'name', 'profile'] }, { model: Skills, attributes: ['skill_name'] }], logging: true })
        if (data) {
            const response = getPagingData(data, page, limit);
            res.send(response);
        }
    } catch (err) {
        console.log(err)
        res.status(422).json({
            message: 'Data cannot be processed',
        })
    }
};



// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
    try {
        const { body, params } = req
        const activitiesSchema = Joi.object().keys({
            skill: Joi.number().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            startdate: Joi.date().timestamp().required(),
            enddate: Joi.date().timestamp().required().min(Joi.ref('startdate')).required(),
            participants: Joi.array().optional()

        });
        const result = activitiesSchema.validate(body);
        const { error } = result;
        const valid = error == null;
        console.log(result)
        if (!valid) {
            res.status(422).json({
                message: 'Data cannot be processed'
            })
        } else {
            const id = params.id;
            const update = await Activities.update(body, {
                where: { id: id }
            })
            if (update) {
                res.status(200).json({
                    message: 'update success',
                })
            }
        }
    } catch (err) {
        console.log(err)
        res.status(422).json({
            message: 'Data cannot be processed',
        })
    }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
    try {
        const { params } = req
        const id = params.id;
        const update = await Activities.destroy({
            where: { id: id }
        })
        if (update) {
            res.status(200).json({
                message: 'update success',
            })
        }

    } catch (err) {
        console.log(err)
        res.status(422).json({
            message: 'Data cannot be processed',
        })
    }
};

