import InMemoryInterface from 'lib/interface/InMemoryInterface.js';
import MongodbInterface from "lib/interface/MongodbInterface.js";

export const interfaceFactory = mode => {
    switch (mode) {
        case 'mongodb':
            return new MongodbInterface();
        case 'inMemory':
            return new InMemoryInterface();
        default:
            return new InMemoryInterface();
    }
};