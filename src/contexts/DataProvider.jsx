import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { DateProvider } from './dateContext';
import { ItemsProvider } from './itemsContext';
import { ClientProvider } from './clientContext';
import { InvoiceProvider } from './invoiceItems';
import { ToastProvider } from './notifyContext';

const DataContext = createContext();

export function DataProvider({ children }) {
    return (
        <DateProvider>
            <ItemsProvider>
                <ToastProvider>
                    <ClientProvider>
                        <InvoiceProvider>
                            <DataContext.Provider value={children}>{children}</DataContext.Provider>
                        </InvoiceProvider>
                    </ClientProvider>
                </ToastProvider>
            </ItemsProvider>
        </DateProvider>
    );
}
DataProvider.propTypes = {
    children: PropTypes.element
};
