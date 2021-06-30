import AuthenticationRepo from "../AuthenticationRepo.js";
import bcrypt from "bcryptjs";

class InMemoryAuthenticationRepo extends AuthenticationRepo{
    constructor() {
        super();
        this.db = generateDb();
    }

    getWorkerById = userId => new Promise( async (resolve, reject) => {
        const worker = this.db
            .find(x => x.id === userId);
        if(!worker) return reject('no worker found.')
        resolve(worker);
    })

    getWorkerByUsername = userName => new Promise(async (resolve, reject) => {
        const worker = this.db
            .find(x => x.user === userName);
        if(!worker) return reject('no worker found.')
        resolve(worker);
    })
}

export default InMemoryAuthenticationRepo;

const generateDb = () => [
    {
        user: 'john@shufflespace.ca',
        password: bcrypt.hashSync('123', 10),
        name: 'John',
        id: '1'
    },
    {
        user: 'bob@shufflespace.ca',
        password: bcrypt.hashSync('12345', 10),
        name: 'Bob',
        id: '2'
    }
]