const getUserProjectsUseCase = projectRepo =>
    userId => new Promise(async (resolve, reject) => {
        if (!userId) return reject('user id cannot be empty');
        try {
            const projects = await projectRepo.getUserProjects(userId);
            resolve(projects);
        } catch (e) {
            reject(e.toString());
        }
    });

export default getUserProjectsUseCase;