const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();
var bcrypt = require("bcryptjs");



const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const Skills = db.skills;
const User = db.users;
const dump = async () => {
    await Skills.create({
        id: 1,
        skill_name: "Archer"
    });

    await Skills.create({
        id: 2,
        skill_name: "Martial arts"
    });

    await Skills.create({
        id: 3,
        skill_name: "Football"
    });

    await User.create({
        name: 'Asep Rahman',
        email: 'aseprahmanurhakim04@gmail.com',
        username: 'arn04',
        profile: 'board',
        password: bcrypt.hashSync('gikslab', 8)
    })

    await User.create({
        name: 'Asep Rahman',
        email: 'aseprahmanurhakim04+1@gmail.com',
        username: 'arn05',
        profile: 'expert',
        password: bcrypt.hashSync('gikslab', 8)
    })

    await User.create({
        name: 'Asep Rahman',
        email: 'aseprahmanurhakim04+2@gmail.com',
        username: 'arn06',
        profile: 'trainer',
        password: bcrypt.hashSync('gikslab', 8)
    })
}

db.sequelize.sync({ force: true }).then(async () => {
    console.log('Drop and Resync Db');
    await dump();
});

app.use(cors({ origin: true, credentials: true }));



// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, Content-Type, Accept"
    );
    next();
});
require("./app/routes/auth.routes")(app);
require("./app/routes/skills.routes")(app);
require("./app/routes/activities.routes")(app);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to gikslab practice test." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});