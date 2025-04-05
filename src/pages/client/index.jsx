// project import
import React from 'react';
import { Grid, Typography } from '@mui/material';
import ClientRecord from './records';

// ==============================|| SAMPLE PAGE ||============================== //

export default function CustomerPage() {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            {/* row 2 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Client Accounts</Typography>
            </Grid>
            <Grid item xs={12} md={7} lg={12}>
                <ClientRecord />
            </Grid>
        </Grid>
    );
}
