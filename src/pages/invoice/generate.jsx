import MainCard from 'components/MainCard';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

// material-ui
import {
    Autocomplete,
    ListItem,
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    TextField,
    useTheme,
    InputAdornment,
    Stack,
    Typography,
    IconButton,
    Chip,
    ButtonBase,
    Input,
    Paper,
    FormLabel,
    Avatar
} from '@mui/material';

import { AttachMoney, ChevronLeft, ChevronRight, RefreshRounded, SettingsInputAntennaOutlined } from '@mui/icons-material';

// project imports
import { clientRows, popularItems } from 'contexts/auth-reducer/data';
import AnimateButton from 'components/@extended/AnimateButton';
import { useDate } from 'contexts/dateContext';
import { createRenderTags } from 'components/@extended/renderTags';
import { BuildFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import TemplateDialog from './tamplateDialog';

// const MyChip = ({ key, rest, option, labelField }) => {
//     const [mouseEnter, setMouseEnter] = React.useState(false);
//     const [quantity, setQuantity] = React.useState(1);

//     return (
//         <Chip
//             key={key}
//             onMouseEnter={() => setMouseEnter(true)}
//             onMouseLeave={() => setMouseEnter(false)}
//             {...rest}
//             icon={
//                 <Box>
//                     <Stack direction="row">
//                         {mouseEnter && (
//                             <ButtonBase
//                                 sx={{ mr: 1 }}
//                                 onClick={() => setQuantity((prevValue) => (prevValue >= 0 ? prevValue - 1 : prevValue))}
//                             >
//                                 <MinusOutlined sx={{ fontSize: 15 }} />
//                             </ButtonBase>
//                         )}
//                         <Avatar variant="circular" sx={{ bgcolor: '#3081A7FF', width: 15, height: 15, fontSize: 11 }}>
//                             {quantity}
//                         </Avatar>

//                         {mouseEnter && (
//                             <ButtonBase sx={{ pl: 1 }} onClick={() => setQuantity((prevValue) => prevValue + 1)}>
//                                 <PlusOutlined sx={{ fontSize: 15 }} />
//                             </ButtonBase>
//                         )}
//                     </Stack>
//                 </Box>
//             }
//             label={option[labelField]}
//         />
//     );
// };
const MyChip = ({ key, rest, option, labelField, quantity, onQuantityChange }) => {
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
            {...rest}
            onMouseEnter={() => setMouseEnter(true)}
            onMouseLeave={() => setMouseEnter(false)}
            icon={
                <Box>
                    <Stack direction="row">
                        {mouseEnter && (
                            <ButtonBase sx={{ mr: 0.5, p: 0.5, borderRadius: '50%' }} onClick={handleDecrease}>
                                <MinusOutlined style={{ fontSize: 12, color: '#11668DFF' }} />
                            </ButtonBase>
                        )}
                        <Avatar variant="circular" sx={{ bgcolor: '#3081A7FF', width: 15, height: 15, fontSize: 11 }}>
                            {quantity}
                        </Avatar>
                        {mouseEnter && (
                            <ButtonBase sx={{ ml: 0.5, p: 0.5, borderRadius: '50%' }} onClick={handleIncrease}>
                                <PlusOutlined style={{ fontSize: 12, color: '#3081A7FF' }} />
                            </ButtonBase>
                        )}
                    </Stack>
                </Box>
            }
            label={option[labelField]}
        />
    );
};
MyChip.propTypes = {
    key: PropTypes.number,
    quantity: PropTypes.any,
    onQuantityChange: PropTypes.func,
    rest: PropTypes.any,
    option: PropTypes.any,
    labelField: PropTypes.string
};

export const GenerateInvoice = () => {
    const theme = useTheme();
    const myDate = useDate();
    const [open, setOpen] = React.useState(false);

    const initialValues = {
        client: null,
        payment: null,
        item: null,
        InvDate: myDate.value
    };

    const [itemQuantities, setItemQuantities] = React.useState({});

    const handleQuantityChange = (itemId, quantity) => {
        setItemQuantities((prev) => ({
            ...prev,
            [itemId]: quantity
        }));
    };

    const ItemOptions = popularItems.map((option) => {
        const firstLetter = option.description[0].toUpperCase();
        return { firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter, ...option };
    });

    const ClientOptions = clientRows.map((option) => {
        const firstLetter = option.supplier_name[0].toUpperCase();
        return { firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter, ...option };
    });

    const submit = async (params, { setSubmitting, resetForm }) => {
        setSubmitting(false);
        resetForm({ values: initialValues, touched: {} });
    };

    // const CreateRenderTags = (labelField) => {
    //     return function renderTags(tagValue, getTagProps) {
    //         return tagValue.map((option, index) => {
    //             const { key, ...rest } = getTagProps({ index });
    //             return <MyChip key={key} labelField={labelField} option={option} rest={rest} />;
    //         });
    //     };
    // };

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
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={10} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Generate Invoice</Typography>
            </Grid>
            <Grid item xs={2} sx={{ mb: -2.25 }}>
                <AnimateButton>
                    <Button disableElevation onClick={() => setOpen(true)} variant="contained" color="primary" startIcon={<BuildFilled />}>
                        Generate
                    </Button>
                </AnimateButton>
            </Grid>
            <Grid item xs={12} md={7} lg={12}>
                <MainCard title="Add New Invoice">
                    <Box>
                        <Formik
                            initialValues={{
                                client: null,
                                payment: null,
                                item: null,
                                InvDate: ''
                            }}
                            onSubmit={submit}
                            validationSchema={Yup.object().shape({
                                INVdate: Yup.date().required('Invoice Date is required'),
                                client: Yup.array().required('Client is required'),
                                item: Yup.array().required('Item is required')
                            })}
                        >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, resetForm }) => (
                                <form noValidate onSubmit={handleSubmit}>
                                    <ListItem disableGutters>
                                        <FormControl
                                            size="small"
                                            error={Boolean(touched.INVdate && errors.INVdate)}
                                            sx={{ ...theme.typography.customInput }}
                                        >
                                            <InputLabel htmlFor="outlined-adornment-email">Invoice Date</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-INVdate"
                                                type="date"
                                                value={values.INVdate}
                                                name="INVdate"
                                                onBlur={handleBlur}
                                                sx={{ paddingTop: 1.5 }}
                                                onChange={handleChange}
                                                label="Invoice Date"
                                            />
                                            {touched.INVdate && errors.INVdate && (
                                                <FormHelperText error id="standard-weight-helper-text-INVdate">
                                                    {errors.INVdate}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </ListItem>
                                    <Stack paddingY={1}>
                                        <Autocomplete
                                            id="client"
                                            name="client"
                                            fullWidth
                                            multiple
                                            limitTags={5}
                                            onBlur={handleBlur}
                                            value={values.client ? values.client : []}
                                            onChange={(e, value, r, d) => {
                                                handleChange({
                                                    ...e,
                                                    ...d,
                                                    ...r,
                                                    target: {
                                                        ...e.target,
                                                        value: value.length <= 0 ? null : value,
                                                        name: 'client'
                                                    }
                                                });
                                                // Update quantities for selected items
                                                const newItemQuantities = {};
                                                value.forEach((item) => {
                                                    newItemQuantities[item.item_id] = itemQuantities[item.item_id] || 1; // Default to 1
                                                });
                                                setItemQuantities(newItemQuantities);
                                            }}
                                            renderTags={createRenderTags('supplier_name')}
                                            isOptionEqualToValue={(option, value) => option.tin_number === value.tin_number}
                                            getOptionKey={(option) => option.supplier_name}
                                            getOptionLabel={(option) => option.supplier_name}
                                            classes={{
                                                clearIndicator: 'input-C'
                                            }}
                                            groupBy={(options) => options.firstLetter}
                                            options={ClientOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    error={Boolean(touched.client && errors.client)}
                                                    label="Client Account"
                                                    helperText={touched.client && errors.client}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <>
                                                                {params.InputProps.endAdornment}
                                                                <InputAdornment position="end" className="input-A">
                                                                    <IconButton>
                                                                        <RefreshRounded stroke={1.5} />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            </>
                                                        )
                                                    }}
                                                />
                                            )}
                                        />
                                    </Stack>
                                    <Stack paddingY={1}>
                                        <Autocomplete
                                            id="item"
                                            name="item"
                                            fullWidth
                                            multiple
                                            limitTags={5}
                                            onBlur={handleBlur}
                                            value={values.item ? values.item : []}
                                            onChange={(e, value, r, d) =>
                                                handleChange({
                                                    ...e,
                                                    ...d,
                                                    ...r,
                                                    target: {
                                                        ...e.target,
                                                        value: value.length <= 0 ? null : value,
                                                        name: 'item'
                                                    }
                                                })
                                            }
                                            renderTags={CreateRenderTags('item_name')}
                                            isOptionEqualToValue={(option, value) => option.item_id === value.item_id}
                                            getOptionKey={(option) => option.item_id}
                                            getOptionLabel={(option) => option.item_name}
                                            classes={{
                                                clearIndicator: 'input-C'
                                            }}
                                            renderOption={(props, option) => (
                                                <li {...props} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>{option.item_name}</span>
                                                    <span>{option.category}</span>
                                                    <span>{option.item_id}</span>
                                                </li>
                                            )}

                                            groupBy={(options) => options.firstLetter}
                                            options={ItemOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    error={Boolean(touched.item && errors.item)}
                                                    label="Items"
                                                    helperText={touched.item && errors.item}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <>
                                                                {params.InputProps.endAdornment}
                                                                <InputAdornment position="end" className="input-A">
                                                                    <IconButton>
                                                                        <RefreshRounded stroke={1.5} />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            </>
                                                        )
                                                    }}
                                                />
                                            )}
                                        />
                                    </Stack>
                                    <Stack justifyContent="center" alignItems="center">
                                        <FormHelperText> optional </FormHelperText>
                                        <ButtonBase sx={{ display: 'flex' }}>
                                            <Chip
                                                icon={<AttachMoney />}
                                                label="Add payment"
                                                color="primary"
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    ':hover': {
                                                        backgroundColor: theme.palette.primary.main,
                                                        color: theme.palette.primary.contrastText
                                                    }
                                                }}
                                            />
                                        </ButtonBase>
                                    </Stack>

                                    <Box sx={{ mt: 2 }}>
                                        <Stack direction="row" container spacing={1} justifyContent="flex-end">
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    disabled={isSubmitting}
                                                    fullWidth
                                                    onClick={() => resetForm({ values: initialValues, touched: {} })}
                                                    variant="contained"
                                                    color="secondary"
                                                >
                                                    Clear
                                                </Button>
                                            </AnimateButton>
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    disabled={isSubmitting}
                                                    fullWidth
                                                    // type="submit"
                                                    onClick={() => setOpen(true)}
                                                    variant="contained"
                                                    color="secondary"
                                                >
                                                    Save
                                                </Button>
                                            </AnimateButton>
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    disabled={isSubmitting}
                                                    onClick={() => setOpen(true)}
                                                    variant="contained"
                                                    color="secondary"
                                                >
                                                    Save And Generate
                                                </Button>
                                            </AnimateButton>
                                        </Stack>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </Box>
                    <TemplateDialog open={open} setOpen={setOpen} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

GenerateInvoice.propTypes = {
    isLoading: PropTypes.bool
};
export default GenerateInvoice;
