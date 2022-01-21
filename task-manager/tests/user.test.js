const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '76what!!',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

// For every single test, this is called before
beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

afterEach(() => {
})

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Erdem',
        email: 'erdem@example.com',
        password: 'MyPass777!'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should not login nont existing user', async () => {
    await request(app).post('/users/login').send({
        email: "name@domain.com",
        password: "12345"
    }).expect(400)
})

// User Authentication based tests
test('Should get profile for user', async () => {
    await request(app)
            .get('/users/me')
            .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
            .send()
            .expect(200)
})

test('Should not get profile for unauthenticated user', async() => {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async() => {
    await request(app)
    .delete('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not delete account for unauthenticated user', async() => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)  
})