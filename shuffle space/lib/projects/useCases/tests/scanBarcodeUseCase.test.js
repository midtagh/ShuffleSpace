import InMemoryProjectsRepo from '../../projectsRepo/inMemoryRepo/InMemoryProjectsRepo.js';
import scanBarcodeUseCase from '../scanBarcodeUseCase.js';

test('can scan a barcode first time successfully', async () => {
    const repo = new InMemoryProjectsRepo()
    const useCase = scanBarcodeUseCase(repo);
    const project = await useCase('1','1');
    expect(project.timeShifts).toHaveLength(2);
    expect(project.timeShifts[1].end).toBeUndefined();
})

test('can scan a barcode second time successfully', async () => {
    const repo = new InMemoryProjectsRepo()
    const useCase = scanBarcodeUseCase(repo);

    await useCase('1','1');
    const project = await useCase('1','1');

    expect(project.timeShifts).toHaveLength(2);
    expect(project.timeShifts[1].end).not.toBeUndefined();
})

test('fails to get a project if no user id is provided.', () => {
    const repo = new InMemoryProjectsRepo()
    const useCase = scanBarcodeUseCase(repo);

    expect(() => useCase(null, '1')).rejects.toBe('worker id cannot be empty');
})

test('fails to get a project if no project id is provided.', () => {
    const repo = new InMemoryProjectsRepo()
    const useCase = scanBarcodeUseCase(repo);

    expect(() => useCase('1', null)).rejects.toBe('project id cannot be empty');
})



