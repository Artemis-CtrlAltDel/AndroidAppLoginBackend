const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config/config.json')


module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split?.(' ')?.[1]
    if (!token) return res.status(401).json({ message: 'you are not authenticated' })
    try {
        const { email } = jwt.verify(token, config.secret)
        const user = await User.findOne({ email })
        req.user = user
        return next()
    } catch (err) {
        return res.status(500).json({ message: 'something went wrong' })
    }

}