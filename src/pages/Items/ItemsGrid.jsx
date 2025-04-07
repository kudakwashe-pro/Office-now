import React, { useState } from 'react';

// material-ui
import {
    ButtonBase,
    Checkbox,
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

import { KeyboardArrowDown, Edit, Delete, KeyboardArrowUp, SelectAll, SelectAllRounded } from '@mui/icons-material';

// assets
import { Box } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import MyTooltip from 'components/@extended/MyTooltip';
import PropTypes from 'prop-types';
import { CheckSquareFilled, CheckSquareOutlined } from '@ant-design/icons';

// ==============================|| ITEMS GRID ||============================== //
const Row = ({ row, searchTerm, columns, onEdit, enableSelect = false, onSelectItem, selectedItems }) => {
    const [open, setOpen] = React.useState(false);

    const highlightText = (text) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, index) =>
            regex.test(part) ? (
                <span key={index} style={{ color: 'Highlight', fontWeight: 'bold' }}>
                    {part}
                </span>
            ) : (
                part
            )
        );
    };
    const handleSelect = (e, selected) => {
        if (selected) {
            onSelectItem(row.item_id, 'selected');
        } else {
            onSelectItem(row.item_id, 'deselected');
        }
    };

    return (
        <>
            <TableRow selected={open}>
                <TableCell
                    sx={{
                        pl: 0.5,
                        pr: 0.4,
                        py: '5px',
                        borderColor: 'divider'
                    }}
                >
                    {enableSelect ? (
                        <Checkbox
                            sx={{
                                pl: 0.5,
                                pr: 0.4,
                                py: '5px'
                            }}
                            checked={selectedItems.includes(row.item_id)}
                            onChange={handleSelect}
                            color="primary"
                        />
                    ) : (
                        <ButtonBase onClick={() => setOpen(!open)}>
                            {open ? (
                                <KeyboardArrowUp sx={{ stroke: 1.5, fontSize: 20 }} />
                            ) : (
                                <KeyboardArrowDown sx={{ stroke: 1.5, fontSize: 20 }} />
                            )}
                        </ButtonBase>
                    )}
                </TableCell>
                {columns.map((col, key) => (
                    <MyTooltip key={key} title={String(row[col.field])} props={{ placement: 'bottom', arrow: false }}>
                        <TableCell
                            sx={{
                                fontSize: '1.5ex',
                                borderColor: 'divider',
                                py: '9px',
                                ':hover': { bgcolor: '#127CA75B' },
                                pl: 0.4
                            }}
                            key={col.field}
                        >
                            {col?.type === 'date'
                                ? highlightText(new Date(row[col.field]).toISOString().split('T')[0])
                                : highlightText(String(row[col.field]))}
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
                                        <ButtonBase onClick={() => onEdit(row)} sx={{ p: 0.3, ':hover': { borderRadius: '3px' } }}>
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
    emptyRows: PropTypes.number,
    searchTerm: PropTypes.string,
    onEdit: PropTypes.func,
    enableSelect: PropTypes.bool,
    onSelectItem: PropTypes.func,
    selectedItems: PropTypes.array
};

// project imports
export const ItemsGrid = ({ columns, rows, searchTerm, onEdit, enableSelect, onDeleteSelected }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [isSelectAll, setIsSelectAll] = React.useState(false);

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
        () => rows.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rows, rowsPerPage]
    );

    // table pagination functions
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleSelectItem = (id, state) => {
        if (state === 'deselected') {
            setSelectedItems((prev) => prev.filter((item) => item !== id));
        } else if (state === 'selected') {
            setSelectedItems((prev) => [...prev, id]);
        }
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
                                    sortDirection={orderBy === col.field ? order : false}
                                >
                                    <TableSortLabel
                                        active={orderBy === col.field}
                                        direction={orderBy === col.field ? order : 'asc'}
                                        onClick={createSortHandler(col.field)}
                                    >
                                        {col.headerName}
                                        {orderBy === col.field ? (
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
                        {enableSelect && (
                            <TableRow>
                                <TableCell sx={{ p: 0, py: '9px', border: 'none' }} colSpan={8}>
                                    <Box pl={2}>
                                        <Stack direction="row" spacing={1}>
                                            {rows.length === selectedItems.length ? (
                                                <ButtonBase
                                                    onClick={() => {
                                                        setSelectedItems([]);
                                                        setIsSelectAll(true);
                                                    }}
                                                    sx={{ p: 0.3, ':hover': { borderRadius: '3px' } }}
                                                >
                                                    <CheckSquareFilled style={{ fontSize: 15 }} />
                                                </ButtonBase>
                                            ) : (
                                                <ButtonBase
                                                    onClick={() => {
                                                        setSelectedItems(rows.map((row) => row.item_id));
                                                        setIsSelectAll((prev) => !prev);
                                                        setIsSelectAll(false);
                                                    }}
                                                    sx={{ p: 0.3, ':hover': { borderRadius: '3px' } }}
                                                >
                                                    <SelectAll style={{ fontSize: 20 }} />
                                                </ButtonBase>
                                            )}
                                            <MyTooltip title="Delete selected" props={{ placement: 'bottom', arrow: false }}>
                                                <ButtonBase
                                                    onClick={() => {
                                                        onDeleteSelected(selectedItems);
                                                        setSelectedItems([]);
                                                    }}
                                                    sx={{ p: 0.3, ':hover': { borderRadius: '3px' } }}
                                                >
                                                    <Delete sx={{ stroke: 1.5, fontSize: 20 }} />
                                                </ButtonBase>
                                            </MyTooltip>
                                        </Stack>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                        {visibleRows.map((row, key) => (
                            <Row
                                onEdit={onEdit}
                                searchTerm={searchTerm}
                                _key={key}
                                columns={columns}
                                row={row}
                                onSelectItem={handleSelectItem}
                                key={key}
                                selectedItems={selectedItems}
                                emptyRows={emptyRows}
                                enableSelect={enableSelect}
                            />
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
    getInitialData: PropTypes.func,
    searchTerm: PropTypes.string,
    onEdit: PropTypes.func,
    enableSelect: PropTypes.bool,
    onDeleteSelected: PropTypes.func
};
