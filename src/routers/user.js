// @ts-check
/* eslint-disable no-console */
const express = require('express')
const multer = require("multer")

const upload = multer({dest: 'uploads/'})
const router = express.Router()

const USERS = {
    15: {
        nickname: 'foo',
        profileImageKey: undefined,
    },
    16: {
        nickname: 'bar',
        profileImageKey: undefined,
    }
}

router.get('/', (req,res) => {
    res.send('User list')
})

router.param('id', (req,res, next,value)  => {
    console.log(value)
    // @ts-ignore
    const user = USERS[value]

    if(!user) {
        const err =  new Error('User not found')
        err.statusCode= 404
        throw err
    }
    // @ts-ignore
    req.user = user
    next()
})

// /users/15
router.get('/:id',(req,res)=> {
    // 자기가 받고 싶은 컨텐츠의 타입을 헤더에 정의해서 주는거
    const resMineType = req.accepts(['json', 'html']) 
    // 요청자가 원하는것중 하나로 주는거 잘매치되는걸로 돌려줌
    
    if(resMineType === 'json'){
        // @ts-ignore
        res.send(req.user)
    } else if(resMineType === 'html') {
        res.render('user-profile', {
            // @ts-ignore
            nickname : req.user.nickname,
            userId: req.params.id,
            profileImageURL: `/uploads/${req.user.profileImageKey}`
        })
    } 
})
router.post('/', (req,res)=> {
    res.send('User Registered')
})
router.post('/:id/nickname', (req,res) => {
    // req.body
    // @ts-ignore
    const {user} = req 
    const {nickname} = req.body
    user.nickname = nickname
    res.send(`User nickname updated: ${nickname}`)

})

router.post('/:id/profile',upload.single('profile'), (req,res,next) => {
    console.log(req.file)
    const {user} = req 
    const {filename} = req.file
    user.profileImageKey = filename

    // user.profileImage

    res.send(`user prifole uploaded ${filename}`)
})

module.exports = router