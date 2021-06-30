import Worker from "../worker/Worker.js";

const loginUseCase = authenticationRepo =>
    ({user, password}) => new Promise(async (resolve, reject) => {
        if(!user) return reject('cannot login without username.')
        if(!password) return reject('cannot login without password.')
        try{
            const workerSpec = await authenticationRepo.getWorkerByUsername(user);
            const worker = Worker.fromSpec(workerSpec);
            const authenticatedWorker = worker.login({user, password});

            resolve(authenticatedWorker);
        } catch (e) {
            reject(e.toString())
        }
    })

export default loginUseCase;