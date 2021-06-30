import Interface from './Interface.js';

// repos
import mongoDbProjectsRepo from "../projects/projectsRepo/mongodbRepo/mongodbProjectsRepo.js";
import InMemoryAuthenticationRepo from '../authentication/authenticationRepo/inMemoryRepo/inMemoryAuthenticationRepo.js';
import mongodbCustomersRepo from "../customers/customersRepo/mongodbRepo/mongodbCustomersRepo.js";

// use cases
import getUserProjectsUseCase from '../projects/useCases/getUserProjectsUseCase.js';
import getUserProjectUseCase from '../projects/useCases/getUserProjectUseCase.js';
import addTimeShiftToProjectUseCase from '../projects/useCases/addTimeShiftToProjectUseCase.js';
import scanBarcodeUseCase from '../projects/useCases/scanBarcodeUseCase.js';
import getProjectWorkDurationUseCase from '../projects/useCases/getProjectWorkDurationUseCase.js';
import getAllCustomersUseCase from '../customers/useCases/getAllCustomersUseCase.js';
import loginUseCase from '../authentication/useCases/loginUseCase.js';

class InMemoryInterface extends Interface {
    constructor() {
        super();
        this.projectsRepo = new mongoDbProjectsRepo();
        this.authRepo = new InMemoryAuthenticationRepo();
        this.customersRepo = new mongodbCustomersRepo();

        this.projects = {
            addTimeShift: addTimeShiftToProjectUseCase(this.projectsRepo),
            getUserProjects: getUserProjectsUseCase(this.projectsRepo),
            // getUserProject: getUserProjectUseCase(this.projectsRepo),
            getProjectWorkDuration: getProjectWorkDurationUseCase(this.projectsRepo),
            scanBarcode: scanBarcodeUseCase(this.projectsRepo)
        };

        this.customers = {
            getAllCustomers: getAllCustomersUseCase(this.customersRepo, this.projectsRepo)
        }

        this.authentication = {
            login: loginUseCase(this.authRepo)
        }
    }
}

export default InMemoryInterface;