module.exports = (sequelize, Sequelize) => {
    const Activities = sequelize.define("activities", {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        startdate: {
            type: Sequelize.STRING
        },
        enddate: {
            type: Sequelize.STRING
        },


    });

    return Activities;
};