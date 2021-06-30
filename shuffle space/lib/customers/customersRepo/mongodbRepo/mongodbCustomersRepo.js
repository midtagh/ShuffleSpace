import CustomerRepo from "../CustomersRepo.js";
import CustomerModel from "./models/CustomerModel.js";
import Customer from "../../customer/Customer.js";
import mongoose from 'mongoose';
const {connect} = mongoose;

class mongodbCustomersRepo extends  CustomerRepo{
    constructor() {
        super();
        generateDb();
    }

    createCustomer = ({name, id}) => new Promise(async (resolve, reject) => {
        if(!name) return reject('cannot create customer without a name.')
        if(!id) return reject('cannot create customer without id.')

        const customer = {name, id}
        await CustomerModel.insertMany([customer])
        resolve(customer)
    })

    getCustomerById = (id) => new Promise(async (resolve, reject) => {
        if(!id) return reject('cannot retrieve a customer without id.')

        const customer = await CustomerModel.findOne({id}).lean().exec();
        if(!customer) return reject('no customer found.')
        resolve(customer);
    })

    getAllCustomers = () => new Promise(async (resolve, reject) => {
        const customers = await CustomerModel.find().lean().exec();
        resolve(customers)
    })

}

export default mongodbCustomersRepo;

const generateDb = () => {
    const url = process.env.dbUrl || 'mongodb://localhost:22000/shufflespace';
    connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
}
