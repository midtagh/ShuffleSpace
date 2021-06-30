import InMemoryProjectsRepo from '../../projectsRepo/inMemoryRepo/InMemoryProjectsRepo.js';
import getUserProjectUseCase from '../getUserProjectUseCase.js';

test('can get a project successfully', async () => {
    const repo = new InMemoryProjectsRepo()
    const useCase = getUserProjectUseCase(repo);

    const project = await useCase('1', '1');
    expect(project.title).toBe('my awesome project');
});

test('fails to get a project if no user id is provided', () => {
    const repo = new InMemoryProjectsRepo()
    const useCase = getUserProjectUseCase(repo);

    expect(() => useCase(null, '1')).rejects.toBe('user id cannot be empty');
});

test('fails to get a project if no project id is provided', () => {
    const repo = new InMemoryProjectsRepo()
    const useCase = getUserProjectUseCase(repo);

    expect(() => useCase('1', null)).rejects.toBe('project id cannot be empty');
});

test('use case fails due to internal server error', () => {
    const repo = {
        getUserProject: () => Promise.reject('faking an error')
    };

    const useCase = getUserProjectUseCase(repo);

    expect(() => useCase('1', '1')).rejects.toBe('faking an error');
});