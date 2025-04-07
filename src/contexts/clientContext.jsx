import React from 'react';
import PropTypes from 'prop-types';
import { fetch } from 'api/server';

// Project imports

const ClientContext = React.createContext();
export function useClientData() {
    return React.useContext(ClientContext);
}
export function ClientProvider({ children }) {
    const [data, setData] = React.useState([]);
    const [refresh, setRefresh] = React.useState(true);
    const [isClick, setClick] = React.useState(false);
    const [isToast, setToast] = React.useState({ now: false, type: '', msg: '' });
    const [toastState, setToastState] = React.useState(false);

    React.useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch({ url: 'clients/' });
                if (response.status === 200) {
                    setData(response.data);
                    if (isClick) {
                        setToast({ now: true, type: 'success', msg: 'Refresh Successful!' });
                        setToastState(true);
                    }
                }
            } catch (error) {
                setToast({ now: true, type: 'error', msg: 'Error: ' + String(response.status) + ' ' + response.statusText });
                setToastState(true);
            }
        };
        if (refresh) {
            getData();
            setRefresh((prevRefresh) => !prevRefresh);
            setClick((prevRefresh) => !prevRefresh);
        }
    }, [isClick, refresh]);
    function toggleRefresh() {
        setClick(true);
        setRefresh((prevRefresh) => !prevRefresh);
    }
    function toggleRefreshQ() {
        setClick(false);
        setRefresh((prevRefresh) => !prevRefresh);
    }
    function processToast(toast) {
        if (isToast.now) {
            if (isToast.type === 'success') {
                toast.toastSuccess(isToast.msg);
            } else if (isToast.type === 'error') {
                toast.toastError(isToast.msg);
            }
            setToast({ msg: '', type: '', now: false });
        }
    }
    return (
        <ClientContext.Provider value={{ data, toggleRefresh, toggleRefreshQ, processToast, toastState }}>
            {children}
        </ClientContext.Provider>
    );
}
ClientProvider.propTypes = {
    children: PropTypes.element
};
