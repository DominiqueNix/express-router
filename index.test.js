const request = require('supertest');
const app = require('./src/app');
const { describe, test, expect} = require('@jest/globals');
const db = require('./db/connection');
const {User} = require('./models/index')

describe('user endpoints', () => {
    test('GET /user', async() => {
        const response = await request(app).get('/users');
        expect(response.body.length > 1).toBe(true)
    })

    test('GET /users/:id', async() => {
        const response = await request(app).get('/users/1');
        expect(response.body.name).toBe('User 1')
    })

    test('POST /users', async() => {
        const response = await request(app).post('/users').send({
            name: 'User 7', 
            age: 36
        });
        expect(response.statusCode).toBe(200)
    })
    test('PUT /users', async() => {
        const response = await request(app).put('/users/5').send({age: 28});
        let updatedUser = await User.findByPk(5)
        expect(updatedUser.age).toBe(28)
    })
    test('DELETE /users/:id', async() => {
        
        const response = await request(app).delete('/users/6');
        let deleted =await User.findByPk(6)
        expect(deleted).toBe(null)
    })
})