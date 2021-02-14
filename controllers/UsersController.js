const bcrypt    = require('bcrypt');
const passport  = require('passport');
const jwt       = require('jsonwebtoken');
const error_types = require('../middlewares/handler');

async function login(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        console.log(err);
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ status: 'error', code: 'unauthorized' });
    } else {
      return res.json({ token: jwt.sign({id: user.id}, secret) });
    }
  })(req, res, next);
}

module.exports = { login }