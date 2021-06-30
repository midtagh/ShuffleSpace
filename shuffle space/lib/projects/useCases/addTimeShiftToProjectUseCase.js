import Project from '../project/Project.js';
import TimeShift from '../project/timeShift/TimeShift.js';

const addTimeShiftToProjectUseCase = projectRepo =>
    (workerId, projectId) => new Promise(async (resolve, reject) => {
        if (!workerId) return reject('worker id cannot be empty');
        if (!projectId) return reject('project id cannot be empty');
        try {

            const projectSpec = await projectRepo.getProjectById(projectId);
            const project = Project.fromSpec(projectSpec);
            const timeShiftSpec = {
                workerId,
                id: `${project.timeShifts.length + 1}`,
                start: new Date()
            };
            const timeShift = TimeShift.fromSpec(timeShiftSpec);
            project.addTimeShift(timeShift);
            const updatedProjectSpec = project.toSpec();
            const updatedProject = await projectRepo.updateProject(updatedProjectSpec);
            resolve(updatedProject);
        } catch (e) {
            reject(e.toString());
        }
    });


export default addTimeShiftToProjectUseCase;