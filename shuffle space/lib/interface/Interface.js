class Interface {
    projects = {
        addTimeShift: () => Promise.reject('not implemented'),
        getUserProjects: () => Promise.reject('not implemented'),
        getUserProject: () => Promise.reject('not implemented'),
        getProjectWorkDuration: () => Promise.reject('not implemented'),
        scanBarcode: () => Promise.reject('not implemented'),
    };

    customers = {
        getAllCustomers: () => Promise.reject('not implemented')
    };

    authentication = {
        login: () => Promise.reject('not implemented')
    }

}

export default Interface;