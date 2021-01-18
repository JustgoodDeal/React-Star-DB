import {createContext} from 'react';

const MyContext = createContext();

const {
    Provider: SwapiServiceProvider,
    Consumer: SwapiServiceConsumer
} = MyContext;

export {
    MyContext,
    SwapiServiceProvider,
    SwapiServiceConsumer
};
