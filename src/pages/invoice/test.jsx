const MyChip = ({ key, option, labelField, quantity, onQuantityChange }) => {
    const [mouseEnter, setMouseEnter] = React.useState(false);

    const handleDecrease = () => {
        if (quantity > 0) {
            onQuantityChange(option.item_id, quantity - 1);
        }
    };

    const handleIncrease = () => {
        onQuantityChange(option.item_id, quantity + 1);
    };

    return (
        <Chip
            key={key}
            onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
            icon={
                <Box>
                    <Stack direction="row">
                        {mouseEnter && (
                            <ButtonBase sx={{ mr: 1 }} onClick={handleDecrease}>
                                <MinusOutlined sx={{ fontSize: 15 }} />
                            </ButtonBase>
                        )}
                        <Avatar variant="circular" sx={{ bgcolor: '#3081A7FF', width: 15, height: 15, fontSize: 11 }}>
                            {quantity}
                        </Avatar>
                        {mouseEnter && (
                            <ButtonBase sx={{ pl: 1 }} onClick={handleIncrease}>
                                <PlusOutlined sx={{ fontSize: 15 }} />
                            </ButtonBase>
                        )}
                    </Stack>
                </Box>
            }
            label={option[labelField]}
        />
    );
};

const Generator = () => {
    const theme = useTheme();
    const myDate = useDate();
    
    const initialValues = {
        client: null,
        payment: null,
        item: [],
        InvDate: myDate.value
    };

    const [itemQuantities, setItemQuantities] = React.useState({});

    const handleQuantityChange = (itemId, quantity) => {
        setItemQuantities((prev) => ({
            ...prev,
            [itemId]: quantity
        }));
    };

    const submit = async (params, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        resetForm({ values: initialValues, touched: {} });
    };

    const CreateRenderTags = (labelField) => {
        return function renderTags(tagValue, getTagProps) {
            return tagValue.map((option, index) => {
                const { key, ...rest } = getTagProps({ index });
                const quantity = itemQuantities[option.item_id] || 0; // Get quantity for this item
                return (
                    <MyChip 
                        key={key} 
                        labelField={labelField} 
                        option={option} 
                        quantity={quantity} 
                        onQuantityChange={handleQuantityChange} 
                        rest={rest} 
                    />
                );
            });
        };
    };

    return (
        <>
            <MainCard>
                <Box>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={submit}
                        validationSchema={Yup.object().shape({
                            InvDate: Yup.date().required('Invoice Date is required'),
                            client: Yup.array().required('Client is required'),
                            item: Yup.array().required('Item is required')
                        })}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                {/* Other form controls remain unchanged */}

                                <Stack paddingY={1}>
                                    <Autocomplete
                                        id="item"
                                        name="item"
                                        fullWidth
                                        multiple
                                        limitTags={5}
                                        onBlur={handleBlur}
                                        value={values.item ? values.item : []}
                                        onChange={(e, value, r, d) => {
                                            handleChange({
                                                ...e,
                                                ...d,
                                                ...r,
                                                target: {
                                                    ...e.target,
                                                    value: value.length <= 0 ? null : value,
                                                    name: 'item'
                                                }
                                            });
                                            // Update quantities for selected items
                                            const newItemQuantities = {};
                                            value.forEach((item) => {
                                                newItemQuantities[item.item_id] = itemQuantities[item.item_id] || 1; // Default to 1
                                            });
                                            setItemQuantities(newItemQuantities);
                                        }}
                                        renderTags={CreateRenderTags('item_name')}
                                        isOptionEqualToValue={(option, value) => option.item_id === value.item_id}
                                        getOptionKey={(option) => option.item_id}
                                        getOptionLabel={(option) => option.item_name}
                                        options={ItemOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={Boolean(touched.item && errors.item)}
                                                label="Items"
                                                helperText={touched.item && errors.item}
                                            />
                                        )}
                                    />
                                </Stack>
                                {/* Remaining form controls */}
                            </form>
                        )}
                    </Formik>
                </Box>
            </MainCard>
        </>
    );
};

export default GenerateInvoice;