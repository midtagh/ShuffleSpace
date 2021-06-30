import ProductionApi from './ProductionApi';
import DevelopmentApi from './DevelopmentApi';


const environment = process.env.REACT_APP_ENVIRONMENT || 'production'

const apiFactory = env => {
    switch (environment) {
        case 'production':
            return new ProductionApi();
        case 'development':
        default:
            return new DevelopmentApi();
    }
};

export default apiFactory(environment);


