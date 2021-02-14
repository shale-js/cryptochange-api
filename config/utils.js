const bcrypt = require('bcrypt');


function validPassword(password, hash) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return err
        }
        return isMatch;
    });
}

module.exports = { validPassword };