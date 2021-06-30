import express from "express";
import request from 'supertest';
import cookieParser from 'cookie-parser'
import usersRouterFactory from './usersRouterFactory.js';
import authenticationRouterFactory from '../authentication/authenticationRouterFactory.js';
import InMemoryInterface from 'lib/interface/InMemoryInterface.js';
import JwtAuthHandler, { isAuthenticated, jwtMiddleware } from '../../config/authenticationConfig.js';




const app = express()

app.use(express.json())
app.use(cookieParser())

const interfaces = new InMemoryInterface();

const authenticationMiddleware = jwtMiddleware(interfaces.authRepo, 'thisIsHardToGuess');
app.use(authenticationMiddleware);


const authenticationRouter = authenticationRouterFactory(new JwtAuthHandler(interfaces.authentication, 'thisIsHardToGuess'), isAuthenticated);
const usersRouter = usersRouterFactory(interfaces.customers, isAuthenticated);

app.use('/auth', authenticationRouter);
app.use('/users', usersRouter);


test('fail to get user data before authentication', async () => {
    await request(app)
        .post('/users/data')
        .send()
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
});

test('successfully get user data with authentication', async () => {
    const res = await request(app)
        .post('/auth/login')
        .send({
            user: 'john@shufflespace.ca',
            password:'123'
        })
        .set('Accept', 'application/json')

    const cookie = res.header['set-cookie'][0].split('=')[1].split('; ')[0]
    expect(cookie).toBeTruthy()

    await request(app)
        .post('/users/data')
        .send()
        .set('Accept', 'application/json')
        .set('Cookie', [`token=${cookie}`])
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(response => {
            const { user, id, name } = response.body;
            expect(user).toBe('john@shufflespace.ca');
            expect(id).toBe('1');
            expect(name).toBe('John');
        });


});