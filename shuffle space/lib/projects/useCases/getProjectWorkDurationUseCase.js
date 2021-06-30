import Project from "../project/Project.js";

const getProjectWorkDurationUseCase = projectRepo =>
    projectId => new Promise(async (resolve, reject) =>{
        if(!projectId) return reject('project id cannot be empty')
        try{
            const projectSpec = await projectRepo.getProjectById(projectId);
            const project = Project.fromSpec(projectSpec);
            resolve(project.getProjectTotalWork());
        }catch (e){
            reject(e.toString())
        }
    })

export default getProjectWorkDurationUseCase;