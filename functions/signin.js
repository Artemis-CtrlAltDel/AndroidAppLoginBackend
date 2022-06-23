'use strict'

const user = require('../models/user')
const bcrypt = require('bcryptjs')

exports.signinUser = async (email, password) => {

	const userExists = await user.findOne({ email })
	if (!userExists) throw { status: 404, message: "User not found" }

	const hashed_password = userExists.hashed_password

	if (bcrypt.compareSync(password, hashed_password)) {

		return email

	} else {

		throw({ status: 401, message: 'Invalid Credentials !' })
	}
}