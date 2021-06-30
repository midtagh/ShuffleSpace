import InMemoryProjectsRepo from '../../projectsRepo/inMemoryRepo/InMemoryProjectsRepo.js';
import getUserProjectsUseCase from '../getUserProjectsUseCase.js';

test('can get user projects successfully', async () => {
    const repo = new InMemoryProjectsRepo()
    const useCase = getUserProjectsUseCase(repo);

    const projects = await useCase('1');
    expect(projects).toHaveLength(2);
});

test('fails to get user projects if no user id is provided', () => {
    const repo = new InMemoryProjectsRepo()
    const useCase = getUserProjectsUseCase(repo);

    expect(() => useCase()).rejects.toBe('user id cannot be empty');
});

test('use case fails due to internal server error', () => {
    const repo = {
        getUserProjects: () => Promise.reject('internal server error')
    };

    const useCase = getUserProjectsUseCase(repo);

    expect(() => useCase('1')).rejects.toBe('internal server error');
});