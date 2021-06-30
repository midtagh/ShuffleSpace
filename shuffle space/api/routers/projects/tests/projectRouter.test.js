import express from 'express';
import request from 'supertest';
import InMemoryInterface from 'lib/interface/InMemoryInterface.js';
import projectsRouterFactory from '../projectsRouterFactory.js';


const interfaces = new InMemoryInterface();

const isAuthenticated = (req,res,next) => {
    req.worker = {
        id: '1',
    }
    next();
}

const projectsRouter = projectsRouterFactory(interfaces.projects, isAuthenticated);

const app = express();
app.use(express.json());

app.use('/', projectsRouter);

test('can get projects successfully', async () => {
    const res = await request(app)
        .post('/getUserProjects')
        .send({
            userId: '1'
        })
        .set('Accept', 'application/json')
        // .expect(200);
    // console.log(res.body)
    const {body} = res;

    expect(body).toHaveLength(2);
});