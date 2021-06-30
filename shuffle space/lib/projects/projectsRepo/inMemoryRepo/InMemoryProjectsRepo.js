 import ProjectsRepo from '../ProjectsRepo.js';

class InMemoryProjectsRepo extends ProjectsRepo {
    constructor() {
        super();
        this.db = generateDb();
    }

    getProjectById = id => new Promise(async (resolve, reject) => {
        const project = this.db
            .find(x => x.id === id);
        if (!project) return reject('project not found');
        resolve(project);
    });

    getUserProjects = userId => new Promise(async (resolve, reject) => {
        const projects = this.db
            .filter(project => project.userId === userId);
        resolve(projects);
    });

    getUserProject = (userId, id) => new Promise(async (resolve, reject) => {
        const project = this.db
            .filter(project => project.userId === userId)
            .find(project => project.id === id);
        if (!project) return reject('project not found');
        resolve(project);
    });

    updateProject = project => new Promise(async (resolve, reject) => {
        const {id, userId} = project;
        const oldProject = this.db
            .filter(project => project.userId === userId)
            .find(project => project.id === id);
        if (!oldProject) return reject('project not found');
        this.db = this.db
            .filter(x => x.id !== id);

        this.db.push(project);
        resolve(project);
    });

    deleteProject = (userId, id) => new Promise(async (resolve, reject) => {
        const project = this.db
            .filter(project => project.userId === userId)
            .find(project => project.id === id);
        if (!project) return reject('project not found');
        this.db = this.db
            .filter(x => x.id !== id);
        resolve(id);
    });
}

export default InMemoryProjectsRepo;

const generateDb = () => [
    {
        title: 'my awesome project',
        id: '1',
        userId: '1',
        timeShifts: [
            {
                workerId: '1',
                id: '1',
                start: new Date(2021, 5, 4),
                end: new Date(2021, 5, 6)
            }
        ]
    },
    {
        title: 'some shiny project',
        id: '2',
        userId: '1',
        timeShifts: [
            {
                workerId: '2',
                id: '1',
                start: new Date(2021, 3, 4),
                end: new Date(2021, 3, 6)
            }
        ]
    },
    {
        title: 'just another project',
        id: '3',
        userId: '2',
        timeShifts: [
            {
                workerId: '1',
                id: '1',
                start: new Date(2021, 1, 4),
                end: new Date(2021, 1, 6)
            },
            {
                workerId: '2',
                id: '2',
                start: new Date(2021, 3, 7),
                end: new Date(2021, 3, 8)
            },
        ]
    },
    {
        title: 'yet another project',
        id: '4',
        userId: '2',
        timeShifts: []
    },
];