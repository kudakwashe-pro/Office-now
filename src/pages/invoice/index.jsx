import { Grid } from '@mui/material';
import React from 'react';
import GenerateInvoice from './generate';

const InvoicePage = () => {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 2 */}
            <Grid item xs={12} md={7} lg={8}>
                <GenerateInvoice />
            </Grid>
        </Grid>
    );
};

export default InvoicePage;
