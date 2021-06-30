import express from 'express';

const usersRouterFactory = (customersUseCases, isAuthenticated) => {
    const router = express.Router();

    router.post("/data", isAuthenticated, async (req, res) => {

        try {
            res.json(req.worker);
        } catch (e) {
            res.status(500).json(e);
        }
    })

    router.post('/getAllCustomersProjects', isAuthenticated, async (req, res) => {
        try {
            const {userId} = req.body;
            const userProjects = await customersUseCases.getAllCustomers(userId);
            console.log(userProjects)
            res.json(userProjects);
        } catch (e) {
            res.status(500).json(e.toString());
        }
    })

    return router;
}

export default usersRouterFactory;