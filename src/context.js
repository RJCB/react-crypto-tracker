import { createContext, useState } from 'react';

//create a context, with createContext api
export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    // this state will be shared with all components 
    const [currency, setCurrency] = useState('cad');

    return (
        // this is the provider providing state
        <CurrencyContext.Provider value={[currency, setCurrency]}>
            {children}
        </CurrencyContext.Provider>
    );
};