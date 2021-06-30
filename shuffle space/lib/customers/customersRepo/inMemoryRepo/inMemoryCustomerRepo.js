import CustomerRepo from "../CustomersRepo.js";

class InMemoryCustomerRepo extends  CustomerRepo{
    constructor() {
        super();
        this.db = generateDb();
    }

    createCustomer = ({name, id}) => new Promise(async (resolve, reject) => {
        if(!name) return reject('cannot create customer without a name.')
        if(!id) return reject('cannot create customer without id.')

        const customer = {name, id}

        this.db.push(customer)
        resolve(customer)
    })

    getCustomerById = (id) => new Promise(async (resolve, reject) => {
        if(!id) return reject('cannot retrieve a customer without id.')

        const customer = this.db.find(x => x.id === id);
        if(!customer) return reject('no customer found.')
        resolve(customer);
    })

    getAllCustomers = () => new Promise(async (resolve, reject) => {
        const customers = this.db;
        resolve(customers)
    })

}

export default InMemoryCustomerRepo;

const generateDb = () => [
    {
        name: 'Nintendo',
        id: '1'
    },
    {
        name: 'Coca cola',
        id: '2'
    }
];