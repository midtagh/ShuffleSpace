const getUserProjectUseCase = projectRepo =>
    (userId, projectId) => new Promise(async (resolve, reject) => {
        if (!userId) return reject('user id cannot be empty');
        if (!projectId) return reject('project id cannot be empty');
        try {
            const project = await projectRepo.getUserProject(userId, projectId);
            resolve(project);
        } catch (e) {
            reject(e.toString());
        }
    });

export default getUserProjectUseCase;