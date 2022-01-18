const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: '76what!!'
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