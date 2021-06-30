import express, { raw } from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import authenticationRouterFactory from '../authenticationRouterFactory.js';
import InMemoryInterface from 'lib/interface/InMemoryInterface.js';
import JwtAuthHandler, { isAuthenticated, jwtMiddleware } from '../../../config/authenticationConfig.js';


const app = express()

app.use(express.json())
app.use(cookieParser())

const interfaces = new InMemoryInterface();

const authenticationMiddleware = jwtMiddleware(interfaces.authRepo, 'thisIsHardToGuess');
app.use(authenticationMiddleware);


const authenticationRouter = authenticationRouterFactory(
    new JwtAuthHandler(interfaces.authentication, 'thisIsHardToGuess'),
    isAuthenticated)
;

app.use('/', authenticationRouter);


test('successful login', async () => {
    await request(app)
        .post('/login')
        .send({
            user: 'john@shufflespace.ca',
            password:'123'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res => {
            const {user, id, name} = res.body;
            expect(user).toBe('john@shufflespace.ca');
            expect(id).toBe('1');
            expect(name).toBe('John');

            const cookieName = res.header['set-cookie'][0].split('=')[0];
            const cookieValue = res.header['set-cookie'][0].split('=')[1].split('; ')[0];
            expect(cookieName).toBe('token');
            expect(cookieValue).toBeTruthy();
        });
});


test('failed sign in due to wrong password', async () => {
    await request(app)
        .post('/login')
        .send({
            user: 'john@shufflespace.ca',
            password:'321'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
            expect(res.body).toBe('Error: Username or Password does not match.');
        });
});

test('failed sign in due to no user', async () => {
    await request(app)
        .post('/login')
        .send({
            password:'123'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
            expect(res.body).toBe('cannot login without username.');
        });
});

test('failed sign in due to no password', async () => {
    await request(app)
        .post('/login')
        .send({
            user: 'john@shufflespace.ca',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(401)
        .expect(res => {
            expect(res.body).toBe('cannot login without password.');
        });
});

test('successful sign out', async () => {
    const res = await request(app)
        .post('/login')
        .send({
            user: 'john@shufflespace.ca',
            password:'123'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

    const cookie = res.header['set-cookie'][0].split('=')[1].split('; ')[0]
    expect(cookie).toBeTruthy()

    await request(app)
        .post('/logout')
        .send()
        .set('Accept', 'application/json')
        .set('Cookie', [`token=${cookie}`])
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(response => {
            expect(response.body).toBe('signed out successfully')
        });
});
