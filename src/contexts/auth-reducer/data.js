// relationships Items to invoice:One-to-Many & Customers to Invoices: One-to-Many

export const itemsColumns = [
    { field: 'item_id', headerName: 'item_ID' },
    { field: 'item_name', headerName: 'Item Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'price', headerName: 'Price', type: 'number' },
    { field: 'quantity', headerName: 'Quantity', type: 'number' },
    { field: 'category', headerName: 'Category' },
    { field: 'created_at', headerName: 'Created At' },
    { field: 'updated_at', headerName: 'Updated At' }
];
export const popularItems = [
    {
        item_id: 'ITEM-1001',
        item_name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with USB receiver',
        price: 25.99,
        quantity: 150,
        category: 'Electronics',
        created_at: '2025-01-10T08:00:00Z',
        updated_at: '2025-03-01T10:00:00Z'
    },
    {
        item_id: 'ITEM-1002',
        item_name: 'Mechanical Keyboard',
        description: 'RGB backlit mechanical keyboard with blue switches',
        price: 79.99,
        quantity: 85,
        category: 'Electronics',
        created_at: '2025-01-12T09:30:00Z',
        updated_at: '2025-03-02T11:00:00Z'
    },
    {
        item_id: 'ITEM-1003',
        item_name: 'Bluetooth Speaker',
        description: 'Portable waterproof Bluetooth speaker',
        price: 45.0,
        quantity: 200,
        category: 'Audio',
        created_at: '2025-01-15T12:00:00Z',
        updated_at: '2025-03-03T12:30:00Z'
    },
    {
        item_id: 'ITEM-1004',
        item_name: 'Standing Desk',
        description: 'Adjustable height standing desk with memory settings',
        price: 299.99,
        quantity: 30,
        category: 'Furniture',
        created_at: '2025-01-18T10:45:00Z',
        updated_at: '2025-03-04T09:00:00Z'
    },
    {
        item_id: 'ITEM-1005',
        item_name: 'Noise Cancelling Headphones',
        description: 'Over-ear headphones with active noise cancellation',
        price: 129.99,
        quantity: 60,
        category: 'Audio',
        created_at: '2025-01-20T13:15:00Z',
        updated_at: '2025-03-05T14:00:00Z'
    },
    {
        item_id: 'ITEM-1006',
        item_name: 'Smartwatch',
        description: 'Fitness and health tracking smartwatch',
        price: 199.99,
        quantity: 90,
        category: 'Wearables',
        created_at: '2025-01-25T11:00:00Z',
        updated_at: '2025-03-06T12:00:00Z'
    },
    {
        item_id: 'ITEM-1007',
        item_name: 'LED Monitor 24"',
        description: 'Full HD LED monitor with HDMI and VGA ports',
        price: 149.99,
        quantity: 40,
        category: 'Electronics',
        created_at: '2025-01-28T08:30:00Z',
        updated_at: '2025-03-07T09:00:00Z'
    },
    {
        item_id: 'ITEM-1008',
        item_name: 'USB-C Hub',
        description: '7-in-1 USB-C hub with HDMI and SD card support',
        price: 39.99,
        quantity: 110,
        category: 'Accessories',
        created_at: '2025-02-01T10:00:00Z',
        updated_at: '2025-03-08T10:30:00Z'
    },
    {
        item_id: 'ITEM-1009',
        item_name: 'Laptop Stand',
        description: 'Aluminum laptop stand with adjustable angles',
        price: 34.99,
        quantity: 75,
        category: 'Accessories',
        created_at: '2025-02-05T12:00:00Z',
        updated_at: '2025-03-09T12:30:00Z'
    },
    {
        item_id: 'ITEM-1010',
        item_name: 'External Hard Drive 1TB',
        description: 'Portable 1TB external hard drive USB 3.0',
        price: 59.99,
        quantity: 55,
        category: 'Storage',
        created_at: '2025-02-07T09:45:00Z',
        updated_at: '2025-03-10T10:00:00Z'
    },
    {
        item_id: 'ITEM-1011',
        item_name: 'Webcam 1080p',
        description: 'Full HD webcam with built-in microphone',
        price: 49.99,
        quantity: 65,
        category: 'Electronics',
        created_at: '2025-02-10T11:30:00Z',
        updated_at: '2025-03-11T12:00:00Z'
    },
    {
        item_id: 'ITEM-1012',
        item_name: 'Ergonomic Chair',
        description: 'Office chair with lumbar support and mesh back',
        price: 179.99,
        quantity: 25,
        category: 'Furniture',
        created_at: '2025-02-12T14:00:00Z',
        updated_at: '2025-03-12T15:00:00Z'
    },
    {
        item_id: 'ITEM-1013',
        item_name: 'Graphic Drawing Tablet',
        description: 'Digital drawing pad with pressure sensitivity',
        price: 89.99,
        quantity: 45,
        category: 'Design',
        created_at: '2025-02-15T16:00:00Z',
        updated_at: '2025-03-13T16:30:00Z'
    },
    {
        item_id: 'ITEM-1014',
        item_name: 'Wireless Charger',
        description: 'Fast wireless charger pad compatible with all phones',
        price: 29.99,
        quantity: 130,
        category: 'Accessories',
        created_at: '2025-02-18T10:00:00Z',
        updated_at: '2025-03-14T11:00:00Z'
    },
    {
        item_id: 'ITEM-1015',
        item_name: 'Streaming Microphone',
        description: 'USB condenser mic for podcasting and streaming',
        price: 69.99,
        quantity: 50,
        category: 'Audio',
        created_at: '2025-02-20T13:30:00Z',
        updated_at: '2025-03-15T14:00:00Z'
    }
];
export const customersColumns = [
    { field: 'customer_id', headerName: 'Customer ID' },
    { field: 'first_name', headerName: 'First Name' },
    { field: 'last_name', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'address', headerName: 'Address' },
    { field: 'created_at', headerName: 'Created At' },
    { field: 'updated_at', headerName: 'Updated At' }
];

export const clientColumns = [
    { field: 'supplier_name', headerName: 'Name of Supplier' },
    { field: 'address', headerName: 'Address' },
    { field: 'contact_details', headerName: 'Contact Details' },
    { field: 'contact_person', headerName: 'Contact Person' },
    { field: 'tin_number', headerName: 'TIN#' },
    { field: 'vat_number', headerName: 'VAT#' }
];
export const clientRows = [
    {
        supplier_name: 'Alice Johnson',
        address: '123 Maple St',
        contact_details: 'alice@example.com, (555) 123-4567',
        contact_person: 'Alice Johnson',
        tin_number: '123-45-6789',
        vat_number: 'VAT123456'
    },
    {
        supplier_name: 'Bob Smith',
        address: '456 Oak St',
        contact_details: 'bob@example.com, (555) 234-5678',
        contact_person: 'Bob Smith',
        tin_number: '987-65-4321',
        vat_number: 'VAT987654'
    },
    {
        supplier_name: 'Charlie Brown',
        address: '789 Pine St',
        contact_details: 'charlie@example.com, (555) 345-6789',
        contact_person: 'Charlie Brown',
        tin_number: '111-22-3333',
        vat_number: 'VAT111222'
    },
    {
        supplier_name: 'Diana Prince',
        address: '321 Birch St',
        contact_details: 'diana@example.com, (555) 456-7890',
        contact_person: 'Diana Prince',
        tin_number: '444-55-6666',
        vat_number: 'VAT444555'
    },
    {
        supplier_name: 'Ethan Hunt',
        address: '654 Cedar St',
        contact_details: 'ethan@example.com, (555) 567-8901',
        contact_person: 'Ethan Hunt',
        tin_number: '777-88-9999',
        vat_number: 'VAT777888'
    },
    {
        supplier_name: 'Fiona Gallagher',
        address: '987 Spruce St',
        contact_details: 'fiona@example.com, (555) 678-9012',
        contact_person: 'Fiona Gallagher',
        tin_number: '222-33-4444',
        vat_number: 'VAT222333'
    },
    {
        supplier_name: 'George Costanza',
        address: '135 Willow St',
        contact_details: 'george@example.com, (555) 789-0123',
        contact_person: 'George Costanza',
        tin_number: '555-66-7777',
        vat_number: 'VAT555666'
    },
    {
        supplier_name: 'Hannah Montana',
        address: '246 Elm St',
        contact_details: 'hannah@example.com, (555) 890-1234',
        contact_person: 'Hannah Montana',
        tin_number: '888-99-0000',
        vat_number: 'VAT888999'
    },
    {
        supplier_name: 'Ian Malcolm',
        address: '357 Maple Ave',
        contact_details: 'ian@example.com, (555) 901-2345',
        contact_person: 'Ian Malcolm',
        tin_number: '123-21-3210',
        vat_number: 'VAT123321'
    },
    {
        supplier_name: 'Jessica Jones',
        address: '468 Oak Ave',
        contact_details: 'jessica@example.com, (555) 012-3456',
        contact_person: 'Jessica Jones',
        tin_number: '456-54-6543',
        vat_number: 'VAT456654'
    },
    {
        supplier_name: 'Kevin Hart',
        address: '579 Pine Ave',
        contact_details: 'kevin@example.com, (555) 123-4560',
        contact_person: 'Kevin Hart',
        tin_number: '789-78-9876',
        vat_number: 'VAT789987'
    },
    {
        supplier_name: 'Laura Croft',
        address: '680 Cedar Ave',
        contact_details: 'laura@example.com, (555) 234-5671',
        contact_person: 'Laura Croft',
        tin_number: '111-11-1111',
        vat_number: 'VAT111111'
    },
    {
        supplier_name: 'Michael Scott',
        address: '791 Birch Ave',
        contact_details: 'michael@example.com, (555) 345-6782',
        contact_person: 'Michael Scott',
        tin_number: '222-22-2222',
        vat_number: 'VAT222222'
    },
    {
        supplier_name: 'Nina Williams',
        address: '802 Spruce Ave',
        contact_details: 'nina@example.com, (555) 456-7893',
        contact_person: 'Nina Williams',
        tin_number: '333-33-3333',
        vat_number: 'VAT333333'
    },
    {
        supplier_name: 'Oscar Isaac',
        address: '913 Willow Ave',
        contact_details: 'oscar@example.com, (555) 567-8904',
        contact_person: 'Oscar Isaac',
        tin_number: '444-44-4444',
        vat_number: 'VAT444444'
    }
];

export const customerAccounts = [
    {
        customer_id: 'CUST-1001',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1-555-0101',
        address: '123 Main St, Springfield, IL',
        created_at: '2025-02-01T09:00:00Z',
        updated_at: '2025-03-01T10:00:00Z'
    },
    {
        customer_id: 'CUST-1002',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1-555-0102',
        address: '456 Oak Ave, Lincoln, NE',
        created_at: '2025-02-03T11:30:00Z',
        updated_at: '2025-03-03T11:45:00Z'
    },
    {
        customer_id: 'CUST-1003',
        first_name: 'Alice',
        last_name: 'Brown',
        email: 'alice.brown@example.com',
        phone: '+1-555-0103',
        address: '789 Pine Rd, Madison, WI',
        created_at: '2025-02-05T08:15:00Z',
        updated_at: '2025-03-05T09:30:00Z'
    },
    {
        customer_id: 'CUST-1004',
        first_name: 'Bob',
        last_name: 'Johnson',
        email: 'bob.johnson@example.com',
        phone: '+1-555-0104',
        address: '321 Birch Blvd, Austin, TX',
        created_at: '2025-02-06T14:00:00Z',
        updated_at: '2025-03-06T14:30:00Z'
    },
    {
        customer_id: 'CUST-1005',
        first_name: 'Sophie',
        last_name: 'Green',
        email: 'sophie.green@example.com',
        phone: '+1-555-0105',
        address: '654 Maple St, Denver, CO',
        created_at: '2025-02-07T10:00:00Z',
        updated_at: '2025-03-07T10:00:00Z'
    },
    {
        customer_id: 'CUST-1006',
        first_name: 'Tom',
        last_name: 'Lee',
        email: 'tom.lee@example.com',
        phone: '+1-555-0106',
        address: '987 Cedar Dr, Portland, OR',
        created_at: '2025-02-08T12:30:00Z',
        updated_at: '2025-03-08T13:00:00Z'
    },
    {
        customer_id: 'CUST-1007',
        first_name: 'Emily',
        last_name: 'White',
        email: 'emily.white@example.com',
        phone: '+1-555-0107',
        address: '159 Elm Cir, Seattle, WA',
        created_at: '2025-02-09T15:45:00Z',
        updated_at: '2025-03-09T16:00:00Z'
    },
    {
        customer_id: 'CUST-1008',
        first_name: 'David',
        last_name: 'King',
        email: 'david.king@example.com',
        phone: '+1-555-0108',
        address: '753 Walnut Ln, Miami, FL',
        created_at: '2025-02-10T09:30:00Z',
        updated_at: '2025-03-10T10:15:00Z'
    },
    {
        customer_id: 'CUST-1009',
        first_name: 'Grace',
        last_name: 'Adams',
        email: 'grace.adams@example.com',
        phone: '+1-555-0109',
        address: '852 Aspen Ct, Boston, MA',
        created_at: '2025-02-11T14:00:00Z',
        updated_at: '2025-03-11T14:30:00Z'
    },
    {
        customer_id: 'CUST-1010',
        first_name: 'Henry',
        last_name: 'Baker',
        email: 'henry.baker@example.com',
        phone: '+1-555-0110',
        address: '147 Magnolia St, Phoenix, AZ',
        created_at: '2025-02-12T08:45:00Z',
        updated_at: '2025-03-12T09:15:00Z'
    },
    {
        customer_id: 'CUST-1011',
        first_name: 'Lily',
        last_name: 'Clark',
        email: 'lily.clark@example.com',
        phone: '+1-555-0111',
        address: '963 Redwood Dr, Columbus, OH',
        created_at: '2025-02-13T11:20:00Z',
        updated_at: '2025-03-13T11:45:00Z'
    },
    {
        customer_id: 'CUST-1012',
        first_name: 'Jack',
        last_name: 'Davis',
        email: 'jack.davis@example.com',
        phone: '+1-555-0112',
        address: '741 Maple Grove, Atlanta, GA',
        created_at: '2025-02-14T13:00:00Z',
        updated_at: '2025-03-14T13:30:00Z'
    },
    {
        customer_id: 'CUST-1013',
        first_name: 'Nina',
        last_name: 'Evans',
        email: 'nina.evans@example.com',
        phone: '+1-555-0113',
        address: '369 Poplar Ave, Raleigh, NC',
        created_at: '2025-02-15T16:15:00Z',
        updated_at: '2025-03-15T16:45:00Z'
    },
    {
        customer_id: 'CUST-1014',
        first_name: 'Oscar',
        last_name: 'Ford',
        email: 'oscar.ford@example.com',
        phone: '+1-555-0114',
        address: '258 Chestnut St, Salt Lake City, UT',
        created_at: '2025-02-16T10:00:00Z',
        updated_at: '2025-03-16T10:30:00Z'
    },
    {
        customer_id: 'CUST-1015',
        first_name: 'Paula',
        last_name: 'Grant',
        email: 'paula.grant@example.com',
        phone: '+1-555-0115',
        address: '147 Willow Way, Nashville, TN',
        created_at: '2025-02-17T12:00:00Z',
        updated_at: '2025-03-17T12:30:00Z'
    }
];

export const InvoicesColumns = [
    { field: 'invoice_id', headerName: 'invoice_ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'description', headerName: 'Description' },
    { field: 'price', headerName: 'Price', type: 'number' },
    { field: 'quantity', headerName: 'Quantity', type: 'number' },
    { field: 'category', headerName: 'Category' },
    { field: 'created_at', headerName: 'Created At' },
    { field: 'updated_at', headerName: 'Updated At' }
];
export const InvoiceRow = [
    {
        invoice_id: 'INV-1001',
        name: 'John Doe',
        description: 'Website Design Services',
        price: 1200.0,
        quantity: 1,
        category: 'Services',
        created_at: '2025-03-01T10:15:00Z',
        updated_at: '2025-03-02T12:10:00Z'
    },
    {
        invoice_id: 'INV-1002',
        name: 'Jane Smith',
        description: 'Monthly SEO Package',
        price: 500.0,
        quantity: 1,
        category: 'Marketing',
        created_at: '2025-03-03T08:30:00Z',
        updated_at: '2025-03-03T08:30:00Z'
    },
    {
        invoice_id: 'INV-1003',
        name: 'Acme Corp',
        description: 'Cloud Hosting (1 year)',
        price: 240.0,
        quantity: 1,
        category: 'Hosting',
        created_at: '2025-03-05T14:45:00Z',
        updated_at: '2025-03-05T14:45:00Z'
    },
    {
        invoice_id: 'INV-1004',
        name: 'Bob Johnson',
        description: 'Logo Design',
        price: 300.0,
        quantity: 1,
        category: 'Design',
        created_at: '2025-03-06T09:20:00Z',
        updated_at: '2025-03-06T10:00:00Z'
    },
    {
        invoice_id: 'INV-1005',
        name: 'Mega Ltd.',
        description: 'Data Analysis Service',
        price: 750.0,
        quantity: 1,
        category: 'Analytics',
        created_at: '2025-03-07T11:00:00Z',
        updated_at: '2025-03-07T12:00:00Z'
    },
    {
        invoice_id: 'INV-1006',
        name: 'Alice Brown',
        description: 'UI/UX Consultation',
        price: 400.0,
        quantity: 2,
        category: 'Consulting',
        created_at: '2025-03-08T15:30:00Z',
        updated_at: '2025-03-08T16:00:00Z'
    },
    {
        invoice_id: 'INV-1007',
        name: 'Gamma Inc.',
        description: 'Custom Software Development',
        price: 5000.0,
        quantity: 1,
        category: 'Development',
        created_at: '2025-03-09T10:00:00Z',
        updated_at: '2025-03-10T17:00:00Z'
    },
    {
        invoice_id: 'INV-1008',
        name: 'Tom Lee',
        description: 'Technical Support Plan',
        price: 99.99,
        quantity: 3,
        category: 'Support',
        created_at: '2025-03-10T13:00:00Z',
        updated_at: '2025-03-10T13:00:00Z'
    },
    {
        invoice_id: 'INV-1009',
        name: 'Nova Enterprises',
        description: 'Social Media Management',
        price: 800.0,
        quantity: 1,
        category: 'Marketing',
        created_at: '2025-03-11T09:00:00Z',
        updated_at: '2025-03-11T09:30:00Z'
    },
    {
        invoice_id: 'INV-1010',
        name: 'Sophie Green',
        description: 'Photography Session',
        price: 350.0,
        quantity: 1,
        category: 'Media',
        created_at: '2025-03-12T11:15:00Z',
        updated_at: '2025-03-12T11:20:00Z'
    },
    {
        invoice_id: 'INV-1011',
        name: 'Pixel Studio',
        description: 'Video Editing Package',
        price: 600.0,
        quantity: 1,
        category: 'Media',
        created_at: '2025-03-13T12:00:00Z',
        updated_at: '2025-03-13T13:00:00Z'
    },
    {
        invoice_id: 'INV-1012',
        name: 'QuickFix IT',
        description: 'Remote IT Support',
        price: 150.0,
        quantity: 2,
        category: 'Support',
        created_at: '2025-03-14T08:00:00Z',
        updated_at: '2025-03-14T08:45:00Z'
    },
    {
        invoice_id: 'INV-1013',
        name: 'Bright Future',
        description: 'Career Coaching',
        price: 250.0,
        quantity: 1,
        category: 'Education',
        created_at: '2025-03-15T10:10:00Z',
        updated_at: '2025-03-15T10:30:00Z'
    },
    {
        invoice_id: 'INV-1014',
        name: 'Zenith Co.',
        description: 'Enterprise Software License',
        price: 10000.0,
        quantity: 1,
        category: 'Software',
        created_at: '2025-03-16T14:00:00Z',
        updated_at: '2025-03-16T14:00:00Z'
    },
    {
        invoice_id: 'INV-1015',
        name: 'Luna Group',
        description: 'Event Planning Service',
        price: 2000.0,
        quantity: 1,
        category: 'Event',
        created_at: '2025-03-17T16:00:00Z',
        updated_at: '2025-03-17T16:30:00Z'
    }
];
