import InMemoryProjectsRepo from '../InMemoryProjectsRepo.js';

test('can get user projects successfully', async () => {
    const repo = new InMemoryProjectsRepo();

    const userProjects = await repo.getUserProjects('1');

    expect(userProjects).toHaveLength(2);
    expect(userProjects[0].title).toBe('my awesome project');
});

test('can get a user project with project id', async () => {
    const repo = new InMemoryProjectsRepo();

    const project = await repo.getUserProject('1', '1');

    expect(project.title).toBe('my awesome project');
});

test('can not get a user project that is not there', () => {
    const repo = new InMemoryProjectsRepo();

    expect(repo.getUserProject('1', '17')).rejects.toBe('project not found');
});

test('can update a project successfully', async () => {
    const repo = new InMemoryProjectsRepo();

    const updateSpec = {
        title: 'just updated the title',
        id: '4',
        userId: '2',
        timeShifts: []
    };

    await repo.updateProject(updateSpec);

    const updatedProject = await repo.getUserProject('2', '4');

    expect(updatedProject.title).toBe('just updated the title');
});

test('can not update a project that is not there', () => {
    const repo = new InMemoryProjectsRepo();

    const updateSpec = {
        title: 'this does not exist',
        id: '16',
        userId: '2',
        timeShifts: []
    };

    expect(repo.updateProject(updateSpec)).rejects.toBe('project not found');
});

test('can delete a project successfully', async () => {
    const repo = new InMemoryProjectsRepo();

    const result = await repo.deleteProject('1', '1');

    expect(result).toBe('1');

    const userProjects = await repo.getUserProjects('1');

    expect(userProjects).toHaveLength(1);
});

test('can not delete a project that is not there', () => {
    const repo = new InMemoryProjectsRepo();

    expect(repo.deleteProject('1', '99')).rejects.toBe('project not found');
});