import React, { useState } from 'react';

// material-ui
import {
    ButtonBase,
    Collapse,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel
} from '@mui/material';

import { KeyboardArrowDown, Edit, Delete, KeyboardArrowUp } from '@mui/icons-material';

// assets
import { Box } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import MyTooltip from 'components/@extended/MyTooltip';
import PropTypes from 'prop-types';

const Row = ({ row, columns, emptyRows, _key }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TableRow>
                <TableCell
                    sx={{
                        pl: 0.5,
                        pr: 0.4,
                        py: '5px',
                        borderColor: 'divider',
                    }}
                >
                    <ButtonBase onClick={() => setOpen(!open)}>
                        {open ? (
                            <KeyboardArrowUp sx={{ stroke: 1.5, fontSize: 20 }} />
                        ) : (
                            <KeyboardArrowDown sx={{ stroke: 1.5, fontSize: 20 }} />
                        )}
                    </ButtonBase>
                </TableCell>
                {columns.map((col, key) => (
                    <MyTooltip key={key} title={row[col?.field]} props={{ placement: 'bottom', arrow: false }}>
                        <TableCell
                            sx={{
                                fontSize: '1.5ex',
                                borderColor: 'divider',
                                py: '9px',
                                ':hover': { bgcolor: '#127CA75B' },
                                pl: 0.4
                            }}
                            key={col?.field}
                        >
                            {row[col?.field]}
                        </TableCell>
                    </MyTooltip>
                ))}
            </TableRow>
            {open && (
                <TableRow>
                    <TableCell sx={{ p: 0, py: '9px', border: 'none' }} colSpan={8}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box pl={4}>
                                <Stack direction="row" spacing={1}>
                                    <MyTooltip title="Edit" props={{ placement: 'bottom', arrow: false }}>
                                        <ButtonBase sx={{ p: 0.3, ':hover': { borderRadius: '3px' } }}>
                                            <Edit sx={{ stroke: 1.5, fontSize: 19 }} />
                                        </ButtonBase>
                                    </MyTooltip>
                                    <MyTooltip title="Delete" props={{ placement: 'bottom', arrow: false }}>
                                        <ButtonBase sx={{ p: 0.3, ':hover': { borderRadius: '3px' } }}>
                                            <Delete sx={{ stroke: 1.5, fontSize: 20 }} />
                                        </ButtonBase>
                                    </MyTooltip>
                                </Stack>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

Row.propTypes = {
    row: PropTypes.object,
    dropConfig: PropTypes.array,
    columns: PropTypes.array,
    _key: PropTypes.number,
    emptyRows: PropTypes.number
};

// project imports
export const ItemsGrid = ({ columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    //
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () => [...rows].sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rows, rowsPerPage]
    );

    // table pagination functions
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper sx={{ boxShadow: 0 }}>
            <TableContainer sx={{ maxheight: 360 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell variant="head" sx={{ pl: 0.5, pr: 0, borderColor: 'divider', pb: '1px', pt: '12px' }} />
                            {columns.map((col, key) => (
                                <TableCell
                                    variant="head"
                                    sx={{ pl: 0.4, borderColor: 'divider', pb: '1px', pt: '12px' }}
                                    key={key}
                                    sortDirection={orderBy === col?.field ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === col?.field}
                                        direction={orderBy === col?.field ? order : 'asc'}
                                        onClick={createSortHandler(col?.field)}
                                    >
                                        {col?.headerName}
                                        {orderBy === col?.field ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row, key) => (
                            <Row _key={key} columns={columns} row={row} key={key} emptyRows={emptyRows} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                count={rows.length}
                sx={{ border: 'none', p: '1px', fontSize: '1.3ex' }}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

ItemsGrid.propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
    deleteConfig: PropTypes.object,
    EditDialog: PropTypes.any,
    getInitialData: PropTypes.func
};
