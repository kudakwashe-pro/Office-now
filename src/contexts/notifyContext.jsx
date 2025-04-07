import React from 'react';
import PropTypes from 'prop-types';

// toastfy imports
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifyContext = React.createContext();
export function useToaster() {
    return React.useContext(notifyContext);
}
export function ToastProvider({ children }) {
    function toastSuccess(msg) {
        toast.success(msg, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Bounce
        });
    }
    function toastNow() {
        toastSuccess('Test Successfully');
    }
    function toastError(msg) {
        toast.error(msg, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Bounce
        });
    }
    return (
        <notifyContext.Provider value={{ toastSuccess, toastError, toastNow }}>
            <ToastContainer
                autoClose={5000}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Bounce}
            />
            {children}
        </notifyContext.Provider>
    );
}
ToastProvider.propTypes = {
    children: PropTypes.element
};
