import InMemoryAuthenticationRepo from "../inMemoryAuthenticationRepo.js";
import bcrypt from "bcryptjs";

test('can get worker by id successfully', async () => {
    const repo = new InMemoryAuthenticationRepo();

    const worker = await repo.getWorkerById('1');

    expect(worker.name).toBe('John')
    expect(worker.user).toBe('john@shufflespace.ca')

    expect.extend({
        myMatcher(hash, password){
            if(!bcrypt.compareSync(password, hash))
                return {
                    pass: false,
                    message: () => 'Password Not Match'
                }
            return {
                pass: true,
                message: () => ''
            }
        }
    })

    expect(worker.password).myMatcher('123');
})

test('getting worker by id failed', async () => {
    const repo = new InMemoryAuthenticationRepo();

    expect(repo.getWorkerById('5')).rejects.toBe('no worker found.')
})

test('can get worker by user successfully', async () => {
    const repo = new InMemoryAuthenticationRepo();

    const worker = await repo.getWorkerByUsername('john@shufflespace.ca');
    expect(worker.id).toBe('1')
})

test('getting worker by user failed', async () => {
    const repo = new InMemoryAuthenticationRepo();

    expect(repo.getWorkerByUsername('omid@shufflespace.ca')).rejects.toBe('no worker found.')
})