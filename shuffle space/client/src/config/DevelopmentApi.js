import Api from './Api';
import {scanBarcodeAction} from "../features/mainPage/projectSlice";

export default class DevelopmentApi extends Api {
    constructor() {
        super();
    }

    signIn = (user, pass) => {
        return Promise.resolve({
            user: 'test@test.ca',
            id: '1',
            name: 'some name'
        });
    };

    signOut = () => {
        return Promise.resolve('signed out successfully');
    };

    getUserData = () => {
        return new Promise((resolve, reject) => {
            window.setTimeout(
                () => resolve({
                    email: 'test01@a.com',
                    id: '1'
                })
                , 1000
            )
        });
    };

    scanBarcode = () => {
        return new Promise((resolve, reject) => {
            resolve({
                title: 'Nintendo awesome project',
                id: '1',
                userId: '1',
                timeShifts: [
                    {
                        workerId: '1',
                        id: '1',
                        start: new Date(2021, 5, 4),
                        end: new Date(2021, 5, 6)
                    }
                ],
                duration: 1.5 * 60 * 60 * 1000
            })
        })
    }

    getAllUsersProjects = () => {
        return new Promise((resolve, reject) => {
            window.setTimeout(
                () => resolve([
                    {
                        name: 'Nintendo',
                        id: '1',
                        projects: [
                            {
                                title: 'Nintendo awesome project',
                                id: '1',
                                userId: '1',
                                timeShifts: [
                                    {
                                        workerId: '1',
                                        id: '1',
                                        start: new Date(2021, 5, 4),
                                        end: new Date(2021, 5, 6)
                                    }
                                ],
                                duration: 1 * 60 * 60 * 1000
                            },
                            {
                                title: 'Nintendo shiny project',
                                id: '2',
                                userId: '1',
                                timeShifts: [
                                    {
                                        workerId: '2',
                                        id: '1',
                                        start: new Date(2021, 3, 4),
                                        end: new Date(2021, 3, 6)
                                    }
                                ],
                                duration: 2 * 60 * 60 * 1000
                            }
                        ]
                    },
                    {
                        name: 'Coca cola',
                        id: '2',
                        projects: [
                            {
                                title: 'coca cola perfect project',
                                id: '3',
                                userId: '2',
                                timeShifts: [
                                    {
                                        workerId: '1',
                                        id: '1',
                                        start: new Date(2021, 5, 6),
                                        end: new Date(2021, 5, 8)
                                    }
                                ],
                                duration: 3 * 60 * 60 * 1000
                            },
                            {
                                title: 'coca cola shiny project',
                                id: '4',
                                userId: '2',
                                timeShifts: [
                                    {
                                        workerId: '2',
                                        id: '1',
                                        start: new Date(2021, 3, 5),
                                        end: new Date(2021, 3, 9)
                                    }
                                ],
                                duration: 4 * 60 * 60 * 1000
                            }
                        ]
                    }
                ])
                , 1000
            )
        })
    }
}

