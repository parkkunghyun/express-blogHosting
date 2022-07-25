// @ts-check

/* eslint-disable no-console */

const express = require('express')

const app = express()
app.use(express.json())
app.set('views', 'src/views')
app.set('view engine', 'pug')

const userRouter = require('./routers/user')

app.use('/users', userRouter)
app.use('/public', express.static('src/public'))
app.use('/uploads', express.static('uploads'))

app.use((err,req,res,next) => {
    // 4개의 인자를 받으면무조건 에러 핸들링!!
    res.send(err.message)
})

module.exports = app