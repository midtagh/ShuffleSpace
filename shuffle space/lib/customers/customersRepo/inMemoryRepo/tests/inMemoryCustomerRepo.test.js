import InMemoryCustomerRepo from '../inMemoryCustomerRepo.js'

test('can create a customer successfully in repo.', async () => {
    const repo = new InMemoryCustomerRepo();

    const spec = {
        name: 'omid',
        id: '3'
    }

    const createdCustomer = await repo.createCustomer(spec);
    expect(createdCustomer.name).toBe("omid");
    expect(createdCustomer.id).toBe("3");
})

test('creating a customer fail without a name.', async () => {
    const repo = new InMemoryCustomerRepo();

    const spec = {
        id: '3'
    }

    expect(repo.createCustomer(spec)).rejects.toBe('cannot create customer without a name.')
})

test('creating a customer fail without id.', async () => {
    const repo = new InMemoryCustomerRepo();

    const spec = {
        name: 'omid'
    }

    expect(repo.createCustomer(spec)).rejects.toBe('cannot create customer without id.')
})

test('can get a customer', async () => {
    const repo = new InMemoryCustomerRepo();

    const customer = await repo.getCustomerById('1');

    expect(customer.name).toBe('Nintendo')
})

test('can not get a customer without id', async () => {
    const repo = new InMemoryCustomerRepo();

    expect(repo.getCustomerById()).rejects.toBe('cannot retrieve a customer without id.')
})

test('can get all customer', async () => {
    const repo = new InMemoryCustomerRepo();

    const customer = await repo.getAllCustomers();

    expect(customer).toHaveLength(2)
})
