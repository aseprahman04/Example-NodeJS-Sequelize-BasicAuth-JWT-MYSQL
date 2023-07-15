module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
       
        profile: {
            type: Sequelize.ENUM("board", "expert", "trainer", "competitor"),
            defaultValue: "board",
        },
        token: {
            type: Sequelize.STRING
        },
    });

    return User;
};