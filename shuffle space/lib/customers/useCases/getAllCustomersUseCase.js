import Customer from "../customer/Customer.js";
import Project from "../../projects/project/Project.js";

const getAllCustomersUseCase = (customersRepo, projectsRepo) =>
    () => new Promise(async (resolve, reject) => {
        try {
            const allCustomersSpecs = await customersRepo.getAllCustomers();
            const allCustomers = await Promise.all(allCustomersSpecs.map(x => new Promise( async (resolve2,reject2) => {
                    const projectsSpec = await projectsRepo.getUserProjects(x.id);
                    x['projects'] = projectsSpec.map(p => Project.fromSpec(p).toSpec());
                    resolve2(x)
                })
            ));
            resolve(allCustomers);

        } catch (e) {
            reject(e.toString())
        }
    })

export default getAllCustomersUseCase;