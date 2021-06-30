import Worker from "../Worker.js";
import bcrypt from "bcryptjs";

test('can create a Worker', ()=>{
    const spec = {
        name: 'John',
        user: 'john@shufflespace.ca',
        password: '123',
        id: '1'
    }

    const worker = Worker.fromSpec(spec);

    expect(worker.name).toBe('John');
    expect(worker.user).toBe('john@shufflespace.ca');
    expect(worker.password).toBe('123');
    expect(worker.id).toBe('1');
})

test('can worker login successfully', () => {
    const spec = {
        name: 'John',
        user: 'john@shufflespace.ca',
        password: bcrypt.hashSync('123', 10),
        id: '1'
    }

    const worker = Worker.fromSpec(spec);

    const credentials = {
        user: 'john@shufflespace.ca',
        password: '123',
    }

    const authenticatedWorker = worker.login(credentials);
    expect(authenticatedWorker).toEqual({
        user: 'john@shufflespace.ca',
        name: 'John',
        id: '1'
    });
})

test('worker login failed because of wrong password', () => {
    const spec = {
        name: 'John',
        user: 'john@shufflespace.ca',
        password: bcrypt.hashSync('123', 10),
        id: '1'
    }

    const worker = Worker.fromSpec(spec);

    const credentials = {
        user: 'john@shufflespace.ca',
        password: '1234',
    }

    expect(()=>{worker.login(credentials)}).toThrow('Username or Password does not match.');
})

test('worker login failed because of wrong username', () => {
    const spec = {
        name: 'John',
        user: 'john@shufflespace.ca',
        password: bcrypt.hashSync('123', 10),
        id: '1'
    }

    const worker = Worker.fromSpec(spec);

    const credentials = {
        user: 'george@shufflespace.ca',
        password: '123',
    }

    expect(() => worker.login(credentials)).toThrow('Username or Password does not match.');
})

test('can convert worker to spec successfully', () => {
    const spec = {
        name: 'John',
        user: 'john@shufflespace.ca',
        password: '123',
        id: '1'
    }

    const workerSpec = Worker.fromSpec(spec).toSpec();

    expect(workerSpec).toEqual(spec);
});