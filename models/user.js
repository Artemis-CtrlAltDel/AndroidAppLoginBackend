'use strict'

function isEmail(email){
    var emailFormat=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(email !== '' && email.match(emailFormat)){
        return true;
    }
    else{
        return false;
    }
}

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = Schema({ 

	username 		: String,
	email			: {
		required: [true, "email field is required"],
		lowercase: true,
		type: String,
		unique: true,
		validate: [isEmail, "email does not match the correct format"]
	},
	hashed_password	: String,
	created_at		: Date,
    updated_at      : Date,

	temp_password	: String,
	temp_password_time: String

})

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/containers-moon-db')

module.exports = mongoose.model('user', userSchema)