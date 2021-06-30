import Project from "../project/Project.js";

const scanBarcodeUseCase = projectRepo =>
    (workerId, projectId) => new Promise(async (resolve, reject) => {
        if (!workerId) return reject('worker id cannot be empty');
        if (!projectId) return reject('project id cannot be empty');

        try{
            const projectSpec = await projectRepo.getProjectById(projectId);
            const project = Project.fromSpec(projectSpec);
            project.scanBarcode(workerId);

            const updatedProjectSpec = project.toSpec();
            const updatedProject = await projectRepo.updateProject(updatedProjectSpec);

            resolve(updatedProject);
        } catch (e){
            reject(e.toString())
        }
    })

export default scanBarcodeUseCase;