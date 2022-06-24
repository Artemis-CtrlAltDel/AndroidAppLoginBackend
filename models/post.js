const mongoose = require('mongoose')
const user = require('./user')

const schema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    time: {
        type: Date,
        default: Date.now()
    },
    description: { type: String, required: true },
    keys: { type: String, default: '' },
    media: String,
    likes: { type: Number, default: 0 },
    reposts: { type: Number, default: 0 }
})


module.exports = mongoose.model('posts', schema)