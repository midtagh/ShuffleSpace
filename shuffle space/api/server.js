import express from 'express';

import cookieParser from 'cookie-parser'

import cors from 'cors';
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
};

import {interfaceFactory} from './config/config.js';
import projectsRouterFactory from './routers/projects/projectsRouterFactory.js';
import JwtAuthHandler, { isAuthenticated, jwtMiddleware } from './config/authenticationConfig.js';
import authenticationRouterFactory from './routers/authentication/authenticationRouterFactory.js';
import usersRouterFactory from './routers/users/usersRouterFactory.js';

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const secret = process.env.secret || 'hardToGuessSecret';



const interfaces = interfaceFactory('mongodb');

const authenticationMiddleware = jwtMiddleware(interfaces.authRepo, secret);
app.use(authenticationMiddleware);


const authenticationRouter = authenticationRouterFactory(
    new JwtAuthHandler(interfaces.authentication, secret),
    isAuthenticated
);
const usersRouter = usersRouterFactory(interfaces.customers, isAuthenticated);
const projectsRouter = projectsRouterFactory(interfaces.projects, isAuthenticated);


app.use('/auth', authenticationRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

app.listen(
    4000,
    () => console.log('server is alive')
);
