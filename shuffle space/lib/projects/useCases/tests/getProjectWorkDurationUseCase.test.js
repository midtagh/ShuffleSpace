import InMemoryProjectsRepo from '../../projectsRepo/inMemoryRepo/InMemoryProjectsRepo.js';
import getProjectWorkDurationUseCase from "../getProjectWorkDurationUseCase";

test('can scan a barcode second time successfully', async () => {
    const repo = new InMemoryProjectsRepo()
    const useCase = getProjectWorkDurationUseCase(repo);

    const projectDuration = await useCase('3');

    const timeShifts = [
        {
            workerId: '1',
            id: '1',
            start: new Date(2021, 1, 4),
            end: new Date(2021, 1, 6)
        },
        {
            workerId: '2',
            id: '2',
            start: new Date(2021, 3, 7),
            end: new Date(2021, 3, 8)
        },
    ]

    expect(projectDuration).toBe((timeShifts[0].end.getTime() - timeShifts[0].start.getTime()) + (timeShifts[1].end.getTime() - timeShifts[1].start.getTime()))
})

test('fails to get a project duration if no project id id is provided.', () => {
    const repo = new InMemoryProjectsRepo()
    const useCase = getProjectWorkDurationUseCase(repo);

    expect(() => useCase(null)).rejects.toBe('project id cannot be empty');
})

