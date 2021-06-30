import inMemoryCustomerRepo from '../../customersRepo/inMemoryRepo/inMemoryCustomerRepo.js'
import InMemoryProjectsRepo from "../../../projects/projectsRepo/inMemoryRepo/InMemoryProjectsRepo";
import getAllCustomersUseCase from "../getAllCustomersUseCase";

test('can get all customers successfully', async () => {
    const repo = new inMemoryCustomerRepo();
    const projectsRepo = new InMemoryProjectsRepo();
    const useCase = getAllCustomersUseCase(repo, projectsRepo);
    const allCustomers = await useCase();

    expect(allCustomers).toHaveLength(2)
})