const router = require("express").Router();
const { login } = require("../controllers/UsersController");
const passport = require('passport');
// Rutas de la apliación.

router.use("/coins", require("./coins"));

router.use("/bolivar", require("./bolivars"))

router.use("/petro", require("./petros"))

// router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: 'login-success' }));
router.post("/login", (req,res) => login(req,res));
/* router.post("/signup", (req,res) => signup(req,res));
router.post("/restore_password", (req, res) => restore_password(req, res));
 */
// Rutas de la aplicación.

module.exports = router;