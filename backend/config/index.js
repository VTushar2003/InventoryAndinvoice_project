const dotenv = require("dotenv")

dotenv.config();

const APP_PORT = process.env.PORT || 3000;

module.exports = { APP_PORT };
