import React, { useState } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import AnimateButton from 'components/@extended/AnimateButton';
import { BuildFilled } from '@ant-design/icons';
import { createRenderTags } from 'components/@extended/renderTags';
import { RefreshRounded } from '@mui/icons-material';
import { InvoiceRow } from 'contexts/auth-reducer/data';
import { generateInvoice } from 'api/server';
import { useInvoiceData } from 'contexts/invoiceItems';
import { useClientData } from 'contexts/clientContext';
import { useToaster } from 'contexts/notifyContext';

export function forkRecord(value, field, data) {
    let newData = Object();
    const found = data.find((x) => x[field] === value);
    if (found) {
        newData = found;
    }
    return newData;
}
const TemplateDialog = ({ open, setOpen }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const invoice = useInvoiceData();
    const [selected, setSelected] = React.useState(null);
    const client = useClientData();
    const toast = useToaster();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    React.useEffect(() => {
        if (invoice.toastState === true) {
            invoice.processToast(toast);
        }
    }, [toast, invoice]);

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const invoiceOptions = invoice.data
        .map((row) => ({ client_name: forkRecord(row.id, 'id', client.data).supplier_name, ...row }))
        .map((option) => {
            const firstLetter = option.client_name[0].toUpperCase();
            return {
                firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                ...option
            };
        });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerateInvoice = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await generateInvoice({ url: `generate-invoice/${1}/` });
            if (response.status === 200) {
                toast.toastSuccess('Invoice generated successfully');
                setSelected(null);
            }

            // Create a URL for the blob and trigger a download
            // const url = window.URL.createObjectURL(new Blob([response.data]));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', `invoice_${1}.docx`);
            // document.body.appendChild(link);
            // link.click();
            // link.remove();
        } catch (err) {
            toast.toastError('Failed to generate invoice. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const HandleChange = (e, Value) => {
        setSelected(Value);
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Upload Invoice Template</DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        border: '2px dashed #ccc',
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        '&:hover': {
                            backgroundColor: '#f9f9f9'
                        }
                    }}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" />
                    <label htmlFor="file-upload">
                        <Button variant="outlined" component="span">
                            Select Template .docx File
                        </Button>
                    </label>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        {selectedFile ? selectedFile.name : 'Drag and drop a .docx file here, or click to select one.'}
                    </Typography>
                </Box>
                <Stack paddingY={4}>
                    <Autocomplete
                        id="item"
                        name="item"
                        fullWidth
                        multiple
                        limitTags={5}
                        value={selected || []}
                        onChange={HandleChange}
                        renderTags={createRenderTags('client_name')}
                        isOptionEqualToValue={(option, value) => option.invoice_id === value.invoice_id}
                        getOptionKey={(option) => option.invoice_id}
                        getOptionLabel={(option) => option.client_name}
                        renderOption={(props, option) => (
                            <li {...props} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{option.id}</span>
                                <span>{option.client_name}</span>
                                <span>$ {option.total_amount}</span>
                            </li>
                        )}
                        classes={{
                            clearIndicator: 'input-C'
                        }}
                        groupBy={(options) => options.firstLetter}
                        options={invoiceOptions.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                // error={Boolean(touched.item && errors.item)}
                                label="Invoice Account"
                                // helperText={touched.item && errors.item}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {params.InputProps.endAdornment}
                                            <InputAdornment position="end" className="input-A">
                                                <IconButton onClick={invoice.toggleRefresh}>
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
            </DialogContent>
            <DialogActions>
                <AnimateButton>
                    <Button
                        disableElevation
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handleGenerateInvoice}
                        disabled={loading}
                        startIcon={<BuildFilled />}
                    >
                        {loading ? 'Generating...' : 'Generate Invoice'}
                    </Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </AnimateButton>
            </DialogActions>
        </Dialog>
    );
};

TemplateDialog.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func
};

export default TemplateDialog;
