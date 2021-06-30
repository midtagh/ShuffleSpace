import jwt from 'jsonwebtoken';



class JwtAuthHandler {
    constructor(authUseCases, secret) {
        this.useCases = authUseCases;
        this.secret = secret;
    }
    signIn = async (req, res) => {
        try {
            const {user, password} = req.body;
            const authenticatedUser = await this.useCases.login({user, password});
            const token = jwt.sign(authenticatedUser, this.secret);
            res.cookie('token', token);
            res.json(authenticatedUser)
        } catch (e) {
            res.status(401).json(e)
        }
    };

    signOut = async (req, res) => {
        req.logout();
        res.json('signed out successfully');
    };
}


export default JwtAuthHandler;


export const jwtMiddleware = (repo, secret) => {
    return async (req, res, next) => {
        const token = req.cookies.token;
        const workerData = token ?
            await jwt.verify(token, secret) :
            null;
        const worker = workerData ?
            await repo.getWorkerByUsername(workerData.user) :
            null;
        if (worker) {
            req.worker = {
                user: worker.user,
                id: worker.id,
                name: worker.name
            };
            req.logout = () => {
                res.clearCookie('token');
            };
            req.isAuthenticated = () => true;
        } else {
            req.isAuthenticated = () => false;
        }
        next();
    };
};

export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json('not authenticated');
};

