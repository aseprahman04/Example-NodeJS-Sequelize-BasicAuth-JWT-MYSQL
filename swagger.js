const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./app/routes/auth.routes.js', './app/routes/activities.routes.js', './app/routes/skills.routes.js']

swaggerAutogen(outputFile, endpointsFiles)