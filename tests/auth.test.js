const request = require('supertest');
const app = require('../app'); // Ensure app.js exports the Express app

describe('Auth Routes', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ username: 'testuser', password: 'password123' });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'User registered');
    });

    it('should login an existing user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'testuser', password: 'password123' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});
