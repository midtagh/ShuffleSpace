import express from 'express';


const projectsRouterFactory = (projectsUseCases, isAuthenticated) => {
    const router = express.Router();

    router.post('/getUserProjects', isAuthenticated, async (req, res) => {
        try {
            const {userId} = req.body;
            const userProjects = await projectsUseCases.getUserProjects(userId);
            res.json(userProjects);
        } catch (e) {
            res.status(500).json(e.toString());
        }
    });

    router.post('/scanBarcode', isAuthenticated, async (req, res) => {
        try {
            const {projectId} = req.body;
            const updatedProject = await projectsUseCases.scanBarcode(req.worker.id, projectId);
            res.json(updatedProject);
        } catch (e) {
            res.status(500).json(e.toString());
        }
    });

    return router;
};

export default projectsRouterFactory;