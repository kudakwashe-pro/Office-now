// project import
import React from 'react';
import ItemsRecordsPage from './records';
import { Grid, Typography } from '@mui/material';

// ==============================|| SAMPLE PAGE ||============================== //

export default function ItemsPage() {
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            {/* row 2 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Record For Items</Typography>
            </Grid>
            <Grid item xs={12} md={7} lg={12}>
                <ItemsRecordsPage />
            </Grid>
        </Grid>
    );
}
