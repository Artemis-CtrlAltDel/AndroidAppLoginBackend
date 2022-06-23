const Post = require('../models/post')
const router = require('express').Router()

router.use(require('../middlewares/auth'))

router
    .get('/', async (req, res, next) => {
        const data = await Post.find().populate('owner','username email').catch(next)
        res.json(data)
    })
    .post('/', async (req, res,next) => {
        const { description, keys = '' } = req.body
        const user = req.user
        if (!description) return res.status(400).json({ message: 'No description provided' })

        const post = await Post.create({
            owner: user,
            description,
            keys
        }).catch(next)

        if (post) res.json({ post })

    })
    .put('/', async (req, res) => {
        const { description, keys, id } = req.body
        if (!description && !keys) return res.status(400).json({ message: 'No updates provided' })

        const post = await Post.findOneAndUpdate({ _id: id }, {
            $set: {
                description,
                keys
            }
        }, { upsert: true }).catch(next)

        if (post) res.json({ post })
    })


module.exports = router