/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */

const supertest = require('supertest')
const app = require('./app')

const request = supertest(app)

test('retrieve user json', async ()=>{
    const result = await request.get('/users/15').accept('application/json')
    // console.log(result)

    expect(result.body).toMatchObject({
        nickname: expect.any(String),
    })
    // expect(1+2).toBe(3)
    // expect에는 이 값이 tobe이길 바란다!
})

test('retrieve user page', async ()=>{
    const result = await request.get('/users/15').accept('text/html')
    // console.log(result)
    // console.log(result.text)
    
    expect(result.text).toMatch(/^<html>.*<\/html>$/)
    // expect(1+2).toBe(3)
    // expect에는 이 값이 tobe이길 바란다!
})

test('update nickname', async()=> {
    const newNickname = 'newnickname'
    const res = await request.post('/users/15/nickname').send({nickname: newNickname})

    expect(res.status).toBe(200)
    const userResult = await request.get('/users/15').accept('application/json')

    expect(userResult.body).toMatchObject({
        nickname: newNickname
    })
})