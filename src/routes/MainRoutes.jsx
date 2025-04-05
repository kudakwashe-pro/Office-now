import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const ItemsPage = Loadable(lazy(() => import('pages/Items/index')));
const CustomerPage = Loadable(lazy(() => import('pages/client/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <Dashboard />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        // {
        //   path: 'color',
        //   element: <Color />
        // },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        // {
        //   path: 'shadow',
        //   element: <Shadow />
        // },
        // {
        //   path: 'typography',
        //   element: <Typography />
        // }
        {
            path: 'items',
            element: <ItemsPage />
        },
        {
            path: 'clients',
            element: <CustomerPage />
        }
    ]
};

export default MainRoutes;
