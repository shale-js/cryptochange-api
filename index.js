require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const passport          = require("passport");
const JwtStrategy       = require('passport-jwt').Strategy;
const LocalStrategy     = require('passport-local').Strategy;
const ExtractJwt        = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const { User } = require("./models");
const auth = require("./middlewares/auth");


// Configurando Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./documentation.json');

axios.defaults.baseURL = 'https://api.coinpaprika.com/v1';

require("./config/passport")

// This will initialize the passport object on every request

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

//Registrando rutas de la aplicación.
app.use("/api/v1", require("./routes/index"));
app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

app.listen(process.env.PORT, () =>
  console.log("Server running on port:", process.env.PORT)
);
