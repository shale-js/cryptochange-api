'use strict'
const bcrypt = require('bcrypt')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			firstname: DataTypes.STRING,
			lastname: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING
		},
		{
			timestamps: true,
			sequelize,
			modelName: 'User'
		}
	)

	User.beforeSave((user, options) => {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  });
  
  User.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
  };

	User.beforeBulkCreate((users, options) => {
		for (const user of users) {
			const { password } = user

			var saltRounds = 10
			var salt = bcrypt.genSaltSync(saltRounds)
			var hash = bcrypt.hashSync(password, salt)
			user.password = hash
		}
	})

	User.beforeBulkUpdate((users, options) => {
		for (const user of users) {
			const { password } = user

			var saltRounds = 10
			var salt = bcrypt.genSaltSync(saltRounds)
			var hash = bcrypt.hashSync(password, salt)
			user.password = hash
		}
	})

	return User
}
