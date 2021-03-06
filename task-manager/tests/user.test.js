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
    const response = await request(app).post('/users').send({
        name: 'Erdem',
        email: 'erdem@example.com',
        password: 'MyPass777!'
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response with matching specific properties
    expect(response.body).toMatchObject({
        user: {
            name: 'Erdem',
            email: 'erdem@example.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('MyPass777!')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findOne({email: userOne.email})
    expect(response.body.token).toBe(user.tokens[1].token)
    expect(user.tokens[1].token).toMatch(response.body.token)
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


test('Should upload avatar image', async() =>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async() => {
    // Update the name of the test user
    await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Samuel'
        })
        .expect(200)
    // Check the data to confirm it's changed
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Samuel')
})

test('Should not update invalid user fields', async() => {
    await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'London'
        })
        .expect(400)
})


test('Should delete account for user', async() => {
    const response = await request(app)
    .delete('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async() => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)  
})