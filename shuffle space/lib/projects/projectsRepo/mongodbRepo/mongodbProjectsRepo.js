import ProjectsRepo from '../ProjectsRepo.js';
import ProjectModel from "./models/ProjectModel.js";
import mongoose from 'mongoose';
const {connect} = mongoose;

class mongoDbProjectsRepo extends ProjectsRepo {
    constructor() {
        super();
        generateDb();
    }

    getProjectById = id => new Promise(async (resolve, reject) => {
        const project = await ProjectModel.findOne({id}).lean().exec();
        if (!project) return reject('project not found');
        resolve(project);
    });

    getUserProjects = userId => new Promise(async (resolve, reject) => {
        const projects = await ProjectModel.find({userId}).lean().exec();
        resolve(projects);
    });

    updateProject = project => new Promise(async (resolve, reject) => {
        const {id, userId} = project;
        const oldProject = await ProjectModel.findOne({id}).lean().exec();
        if (!oldProject) return reject('project not found');
        await ProjectModel.findOneAndUpdate({id}, {$set:project}).exec();
        resolve(project);
    });

    deleteProject = (userId, id) => new Promise(async (resolve, reject) => {
        const project = await ProjectModel.findOne({id}).lean().exec();
        if (!project) return reject('project not found');
        await ProjectModel.deleteOne({id});
        resolve(id);
    });
}

const generateDb = () => {
    const url = process.env.dbUrl || 'mongodb://localhost:22000/shufflespace';
    connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
}

export default mongoDbProjectsRepo;