import Api from './Api';
import axios from 'axios';


export default class ProductionApi extends Api {
    constructor() {
        super();
        this.url = process.env.API_URL || 'http://localhost:4000'
    }


    signIn = async (user, password) => {
        try {
            const result = await axios.post(
                this.url + '/auth/login',
                {
                    user,
                    password
                },
                {
                    withCredentials: true
                }
            );
            return result.data;
        } catch (e) {
            throw e.response.data
        }
    };

    signOut = async () => {
        try {
            const result = await axios.post(
                this.url + '/auth/logout',
                {
                },
                {
                    withCredentials: true
                }
            );
            return result.data;
        } catch (e) {
            throw e.response.data
        }
    };

    getUserData = async () => {
        try {
            const result = await axios.post(
                this.url + '/users/data',
                {
                },
                {
                    withCredentials: true
                }
            );
            return result.data;
        } catch (e) {
            throw e.response.data
        }
    };

    getAllUsersProjects = async (userId) => {
        try {
            const result = await axios.post(
                this.url + '/users/getAllCustomersProjects',
                {
                    userId: userId
                },
                {
                    withCredentials: true
                }
            );
            return result.data;
        } catch (e) {
            throw e.response.data
        }
    }

    scanBarcode = async (projectId) => {
        try {
            const result = await axios.post(
                this.url + '/projects/scanBarcode',
                {
                    projectId
                },
                {
                    withCredentials: true
                }
            );
            return result.data;
        } catch (e) {
            throw e.response.data
        }
    }
}