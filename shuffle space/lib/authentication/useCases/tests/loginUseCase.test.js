import Worker from "../../worker/Worker.js";
import InMemoryAuthenticationRepo from "../../authenticationRepo/inMemoryRepo/inMemoryAuthenticationRepo.js";
import loginUseCase from "../loginUseCase";

test('can login successfully', async () => {
    const repo = new InMemoryAuthenticationRepo();
    const useCase = loginUseCase(repo);

    const credentials = {
        user: 'john@shufflespace.ca',
        password:'123'
    }

    const worker = await useCase(credentials);
    expect(worker.id).toBe('1')

})

test('logging in failed because of wrong username', () => {
    const repo = new InMemoryAuthenticationRepo();
    const useCase = loginUseCase(repo);

    const credentials = {
        user: 'omid@shufflespace.ca',
        password:'123'
    }

    expect(useCase(credentials)).rejects.toBe("no worker found.")
})