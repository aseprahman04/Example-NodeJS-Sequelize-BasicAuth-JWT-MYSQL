const db = require("../models");
const Skills = db.skills;
const Op = db.Sequelize.Op;
const { getPagination, getPagingData } = require("../utils/pagination");

// Retrieve all Skills from the database.
exports.findAll = async (req, res) => {
    try {
        const { page, size, skill_name } = req.query;
        var condition = skill_name ? { skill_name: { [Op.like]: `%${skill_name}%` } } : null;

        const { limit, offset } = getPagination(page, size);

        const data = await Skills.findAndCountAll({ where: condition, limit, offset })
        if (data) {
            const response = getPagingData(data, page, limit);
            res.send(response);
        }
    } catch (err) {
        res.status(422).json({
            message: 'Data cannot be processed',
        })
    }
};
