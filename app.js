'use strict'

const express    = require('express')  
const mongoose = require('mongoose')      
const app        = express()                
const logger 	   = require('morgan')
const postsRouter = require('./routes/posts')
const router 	   = express.Router()
const port 	   = process.env.PORT || 8080

mongoose.connect('mongodb://localhost:27017/containers-moon-db')


app.use(express.json())
app.use(logger('dev'))

require('./routes')(router)
app.use('/', router)
app.use('/posts',postsRouter)

app.listen(port)

console.log(`App Runs on ${port}`)