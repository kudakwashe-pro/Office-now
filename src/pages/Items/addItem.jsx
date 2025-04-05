import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    ListItem,
    MenuItem,
    OutlinedInput,
    Select,
    useTheme
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AttachFileOutlined, CheckCircle, DisabledByDefault, EmailRounded, FemaleRounded, MaleRounded, Phone } from '@mui/icons-material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDate } from 'contexts/dateContext';
import { grey } from '@mui/material/colors';

export const AddItemDialog = ({ openDialog, setOpenDialog }) => {
    const myDate = useDate();
    const theme = useTheme();

    const initialValues = {
        item_id: '',
        item_name: '',
        description: '',
        price: 0,
        quantity: 0,
        category: '',
        created_at: myDate.value,
        updated_at: ''
    };

    const handleSubmit = async (params, { setSubmitting, resetForm }) => {
        // const response = await createApi({
        //     url:
        // });
        setSubmitting(false);
        resetForm({ values: initialValues, touched: {} });
        setOpenDialog(false);
    };

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle textAlign="center" variant="subtitle1">
                New Item
            </DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 2 }}>
                    <Formik
                        initialValues={{
                            created_at: myDate.value,
                            updated_at: '',
                            item_id: '',
                            item_name: '',
                            description: '',
                            price: 0,
                            quantity: 0,
                            category: ''
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object().shape({
                            created_at: Yup.date().required('Date is required'),
                            updated_at: Yup.date().required('Date is required'),
                            item_id: Yup.string().required('Item name is required'),
                            item_name: Yup.string().required('Item name is required'),
                            description: Yup.string().required('Description is required'),
                            price: Yup.number().required('Price is required'),
                            quantity: Yup.number().required('Quantity is required'),
                            category: Yup.string().required('Category is required')
                        })}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, resetForm, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Grid container direction="column" spacing={2} justifyContent="space-evenly">
                                            <Grid item>
                                                <ListItem disableGutters disablePadding>
                                                    <FormControl
                                                        error={Boolean(touched.created_at && errors.created_at)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-created_at">Created Date</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-created_at"
                                                            type="date"
                                                            value={values.created_at}
                                                            name="created_at"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                        />
                                                        {touched.created_at && errors.created_at && (
                                                            <FormHelperText error id="standard-weight-helper-text-created_at">
                                                                {errors.created_at}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </ListItem>
                                            </Grid>
                                            <Grid item>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.item_name && errors.item_name)}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <InputLabel sx={{ position: 'absolute' }} htmlFor="outlined-item_name">
                                                        Name
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-item_name"
                                                        value={values.item_name}
                                                        name="item_name"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    {touched.item_name && errors.item_name && (
                                                        <FormHelperText error id="standard-weight-helper-text-item_name">
                                                            {errors.item_name}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item>
                                                <FormControl
                                                    fullWidth
                                                    error={Boolean(touched.description && errors.description)}
                                                    sx={{ ...theme.typography.customInput }}
                                                >
                                                    <InputLabel htmlFor="outlined-description">Description</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-description"
                                                        value={values.description}
                                                        multiline
                                                        name="description"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                    />
                                                    {touched.description && errors.description && (
                                                        <FormHelperText error id="standard-weight-helper-text-description">
                                                            {errors.description}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid item>
                                                <ListItem disablePadding>
                                                    <FormControl
                                                        error={Boolean(touched.price && errors.price)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-price">Price</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-price"
                                                            type="number"
                                                            value={values.price}
                                                            name="price"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                        />
                                                        {touched.price && errors.price && (
                                                            <FormHelperText error id="standard-weight-helper-text-price">
                                                                {errors.price}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </ListItem>
                                            </Grid>
                                            <Grid item>
                                                <ListItem disablePadding>
                                                    <FormControl
                                                        error={Boolean(touched.quantity && errors.quantity)}
                                                        sx={{ ...theme.typography.customInput }}
                                                    >
                                                        <InputLabel htmlFor="outlined-quantity">Quantity</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-quantity"
                                                            type="number"
                                                            value={values.quantity}
                                                            name="quantity"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                        />
                                                        {touched.quantity && errors.quantity && (
                                                            <FormHelperText error id="standard-weight-helper-text-quantity">
                                                                {errors.quantity}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </ListItem>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    sx={{ display: 'none' }}
                                    type="submit"
                                    id="submit-btn"
                                    variant="contained"
                                    color="secondary"
                                />
                                <Button
                                    id="clear-btn"
                                    disableElevation
                                    disabled={isSubmitting}
                                    sx={{ display: 'none' }}
                                    onClick={() => resetForm({ values: initialValues, touched: {} })}
                                    variant="contained"
                                    color="secondary"
                                />
                            </form>
                        )}
                    </Formik>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box>
                    <Grid container spacing={3} justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={() => setOpenDialog(false)} disableElevation variant="contained" color="secondary">
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <InputLabel
                                sx={{
                                    borderRadius: '4px',
                                    px: 2,
                                    py: 1,
                                    fontWeight: 'bold',
                                    bgcolor: grey[500],
                                    color: 'white',
                                    ':hover': { background: grey[900] }
                                }}
                                htmlFor="clear-btn"
                            >
                                Clear
                            </InputLabel>
                        </Grid>
                        <Grid item>
                            <InputLabel
                                sx={{
                                    borderRadius: '6px',
                                    px: 2,
                                    py: 1,
                                    fontWeight: 'bold',
                                    bgcolor: grey[500],
                                    color: 'white',
                                    ':hover': { background: grey[900] }
                                }}
                                htmlFor="submit-btn"
                            >
                                {'Save'}
                            </InputLabel>
                        </Grid>
                    </Grid>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

AddItemDialog.propTypes = {
    openDialog: PropTypes.bool,
    setOpenDialog: PropTypes.func
};

export const AddItemBulkDialog = ({ openDialog, setOpenDialog }) => {
    const theme = useTheme();
    const [file, setFile] = React.useState(null);
    const [fileName, setFileName] = React.useState(null);
    const [value, setValue] = React.useState('');

    const handleFileChange = (e) => {
        setValue(e.target.value);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };
    const clear = () => {
        setFile(null);
        setValue('');
        setFileName(null);
    };

    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle align="center" variant="subtitle1">
                New Student
            </DialogTitle>
            <DialogContent>
                <Grid container sx={{ p: 2, mb: 3 }}>
                    <Grid item sx={{ mb: 3 }}>
                        <InputLabel
                            sx={{
                                boxShadow: '0 2px 5px #08080862',
                                px: 3,
                                borderRadius: '10px',
                                bgcolor: theme.palette.mode === 'dark' ? '#36363642' : 'primary.800',
                                ':hover': { background: '#75757536' }
                            }}
                            htmlFor="input-file-dialog"
                        >
                            <Grid container spacing={1} sx={{ p: 1 }} alignItems="center" justifyContent="centre">
                                <Grid item>
                                    <AttachFileOutlined sx={{ rotate: '30deg' }} />
                                </Grid>
                                <Grid item>
                                    <FormLabel>{fileName || 'Select File'}</FormLabel>
                                </Grid>
                            </Grid>
                        </InputLabel>
                        <Input
                            id="input-file-dialog"
                            sx={{ display: 'none' }}
                            type="file"
                            value={value}
                            inputProps={{ accept: '.csv, .xlsx, .txt' }}
                            onChange={handleFileChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Box sx={{ mb: 1 }}>
                    <Grid container spacing={3} justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={() => setOpenDialog(false)} disableElevation variant="contained" color="secondary">
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={clear} disableElevation variant="contained" color="secondary">
                                Clear
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => upload.handleUpload(file, 'bulk/upload_student/')} variant="contained">
                                Upload Bulk
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

AddItemBulkDialog.propTypes = {
    openDialog: PropTypes.bool,
    setOpenDialog: PropTypes.func
};
