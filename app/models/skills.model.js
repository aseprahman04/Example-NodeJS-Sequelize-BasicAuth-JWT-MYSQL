module.exports = (sequelize, Sequelize) => {
    const Skills = sequelize.define("skills", {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        skill_name: {
            type: Sequelize.STRING
        }
    });

    return Skills;
};