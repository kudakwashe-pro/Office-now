// assets
import { ShoppingCartOutlined, UserOutlined , MoneyCollectOutlined} from '@ant-design/icons';

// icons
const icons = {
    UserOutlined,
    ShoppingCartOutlined,
    MoneyCollectOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const manage = {
    id: 'manage',
    title: 'Manage',
    type: 'group',
    children: [
        {
            id: 'items',
            title: 'Items',
            type: 'item',
            url: '/items',
            icon: icons.ShoppingCartOutlined
        },
        {
            id: 'client',
            title: 'Client',
            type: 'item',
            url: '/clients',
            icon: icons.UserOutlined
        },
        {
            id: 'invoice',
            title: 'Invoices',
            type: 'item',
            url: '/invoices',
            icon: icons.MoneyCollectOutlined
        }
    ]
};

export default manage;
