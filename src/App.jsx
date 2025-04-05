import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';
import { DateProvider } from 'contexts/dateContext';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
    return (
        <ThemeCustomization>
            <DateProvider>
                <ScrollTop>
                    <RouterProvider router={router} />
                </ScrollTop>
            </DateProvider>
        </ThemeCustomization>
    );
}
