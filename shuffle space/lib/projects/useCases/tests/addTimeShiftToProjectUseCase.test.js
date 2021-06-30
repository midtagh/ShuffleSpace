import InMemoryProjectsRepo from '../../projectsRepo/inMemoryRepo/InMemoryProjectsRepo.js';
import addTimeShiftToProjectUseCase from '../addTimeShiftToProjectUseCase.js';

test('can start a new time shift on a project', async () => {
    const repo = new InMemoryProjectsRepo();
    const useCase = addTimeShiftToProjectUseCase(repo);

    const projectId = '1';

    const currentProject = await repo.getProjectById(projectId);
    expect(currentProject.timeShifts).toHaveLength(1);

    const currentTimeShiftId = currentProject.timeShifts[0].id;

    await useCase('2', projectId);
    const updatedProject = await repo.getProjectById(projectId);

    expect(updatedProject.timeShifts).toHaveLength(2);
    const newTimeShift = updatedProject.timeShifts.find(x => x.id !== currentTimeShiftId);
    expect(newTimeShift.workerId).toBe('2');
});