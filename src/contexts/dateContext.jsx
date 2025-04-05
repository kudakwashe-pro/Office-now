import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const DateContext = createContext();
export function useDate() {
    return React.useContext(DateContext);
}
export function DateProvider({ children }) {
    const [value, setValue] = React.useState(null);
    const [addValue, setAddValue] = React.useState(0);
    React.useEffect(() => {
        const getDate = (_addValue) => {
            const today = new Date();
            const date = today.setDate(today.getDate() + _addValue);
            const newDate = new Date(date).toISOString().split('T')[0];
            return newDate;
        };
        setValue(getDate(addValue));
    }, [addValue]);

    const differenceInDays = (a = Date(), b = Date()) => {
        (a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24);
    };

    return <DateContext.Provider value={{ value, setAddValue, differenceInDays }}>{children}</DateContext.Provider>;
}
DateProvider.propTypes = {
    children: PropTypes.element
};
