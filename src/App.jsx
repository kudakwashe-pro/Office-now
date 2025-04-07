import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { DataProvider } from 'contexts/DataProvider';
import 'assets/cdn.css';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
    return (
        <ThemeCustomization>
            <DataProvider>
                <ScrollTop>
                    <RouterProvider router={router} />
                </ScrollTop>
            </DataProvider>
        </ThemeCustomization>
    );
}
