// project import
import MainCard from 'components/MainCard';
import { ItemsGrid } from './ItemsGrid';
import { Avatar, ButtonBase, InputAdornment, OutlinedInput, Popover } from '@mui/material';
import { AddCircle, CheckBox, CheckBoxOutlineBlank, Checklist, PlaylistRemove, Refresh, Search } from '@mui/icons-material';
import MyTooltip from 'components/@extended/MyTooltip';
import { Stack } from '@mui/system';
import React from 'react';
import { AddItemDialog } from './addItem';
import { useItemData } from 'contexts/itemsContext';
import { useToaster } from 'contexts/notifyContext';
import { useDate } from 'contexts/dateContext';
import { deleteApi, updateApi } from 'api/server';
import { SelectOutlined } from '@ant-design/icons';

const columns = [
    { field: 'item_id', headerName: 'item_id' },
    { field: 'item_name', headerName: 'Item name' },
    { field: 'description', headerName: 'Description' },
    { field: 'price', headerName: 'Price' },
    { field: 'quantity', headerName: 'Quantity' },
    { field: 'category', headerName: 'category' },
    { field: 'updated_at', headerName: 'updated_at', type: 'date' },
    { field: 'created_at', headerName: 'created_at', type: 'date' }
];
// ==============================|| Item records PAGE ||============================== //

export default function ItemsRecordsPage() {
    const [searchValue, setSearchValue] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [selectedEditItem, setSelectedEditItem] = React.useState({});
    const [enableSelect, setEnableSelect] = React.useState(false);

    const items = useItemData();
    const toast = useToaster();
    const myDate = useDate();

    React.useEffect(() => {
        if (items.toastState === true) {
            items.processToast(toast);
        }
    }, [toast, items]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const col = columns.map((row) => row.field);

    const filteredData = items.data
        .map((params) => ({ ...params }))
        .filter((item) =>
            col.some((value) => item[value] && item[value].toString().toLowerCase().includes(searchValue.toString().toLowerCase()))
        );

    const initialValues = {
        item_name: '',
        description: '',
        price: 0,
        quantity: 0,
        category: '',
        created_at: myDate.value
    };

    const HandleDelete = async (params) => {
        const deleteWithID = async (id) => {
            if (id) {
                const response = await deleteApi({ url: `items/${id}/` });
                if (response.status === 204) {
                    toast.toastSuccess('Item deleted successfully');
                    items.toggleRefreshQ;
                } else {
                    toast.toastError(`Error: ${response.status} ${response.statusText}`);
                }
                items.toggleRefreshQ();
            }
        };
        params.map((id) => deleteWithID(id));
    };

    const handleUpdate = async (params, { setSubmitting, resetForm }) => {
        const toggleFinish = () => {
            resetForm({ values: initialValues, touched: {} });
            setSelectedEditItem({});
            setOpenEditDialog(false);
        };
        let newData = { ...params, updated_at: myDate.value };
        const response = await updateApi({ url: `items/${params.item_id}/`, data: newData });
        if (response.status === 200) {
            toast.toastSuccess('Item updated successfully');
            toggleFinish();
            items.toggleRefreshQ();
        } else {
            toast.toastError(`Error: ${response.status} ${response.statusText}`);
        }
        setSubmitting(false);
    };

    const handleEdit = (row) => {
        setOpenEditDialog(true);
        setSelectedEditItem({
            item_id: row.item_id,
            item_name: row.item_name,
            description: row.description,
            price: row.price,
            quantity: row.quantity,
            category: row.category,
            created_at: new Date(row.created_at).toISOString().split('T')[0]
        });
    };

    const handleCreate = async (params, { setSubmitting, resetForm }) => {
        const toggleFinish = () => {
            resetForm({ values: initialValues, touched: {} });
            setOpenDialog(false);
        };
        let newData = { ...params, updated_at: myDate.value };
        const response = await createApi({ url: `items/`, data: newData });
        if (response.status === 201) {
            toast.toastSuccess('Item create successfully');
            toggleFinish();
            items.toggleRefreshQ();
        } else {
            toast.toastError(`Error: ${response.status} ${response.statusText}`);
        }
        setSubmitting(false);
    };

    return (
        <MainCard
            title={
                <>
                    Item
                    <MyTooltip title="Add New Item" props={{ placement: 'bottom', arrow: false }}>
                        <ButtonBase
                            sx={{
                                borderRadius: '8px',
                                py: 0.7,
                                px: 0.4,
                                ml: 0.5,
                                borderColor: 'divider',
                                borderRight: 'none',
                                bgcolor: 'divider'
                            }}
                            onClick={() => setOpenDialog(!openDialog)}
                        >
                            <AddCircle sx={{ stroke: '1.6ex', fontSize: 20 }} />
                        </ButtonBase>
                    </MyTooltip>
                </>
            }
            secondary={
                <Stack direction="row" spacing={1}>
                    <ButtonBase
                        onClick={handleClick}
                        sx={{
                            borderRadius: '8px',
                            py: 0.7,
                            px: 0.4,
                            // border: _index % 2 === 1 && '1px solid',
                            borderColor: 'divider',
                            borderRight: 'none',
                            ':hover': { bgcolor: 'divider' }
                        }}
                        id="search-option"
                    >
                        <Search sx={{ stroke: '1.6ex', fontSize: 20 }} />
                        {searchValue && (
                            <Avatar
                                sx={{
                                    position: 'absolute',
                                    bgcolor: '#F0F0F0FF',
                                    borderRadius: '50%',
                                    top: -2,
                                    color: 'blue',
                                    left: -4,
                                    width: 14,
                                    fontSize: 10,
                                    height: 14
                                }}
                            >
                                1
                            </Avatar>
                        )}
                    </ButtonBase>
                    <Popover
                        id="search-option"
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                        disableScrollLock
                        slotProps={{ paper: { sx: { borderRadius: '0px' } } }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                    >
                        <OutlinedInput
                            id="input-search-header"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            size="small"
                            placeholder="Search..."
                            fullWidth
                            startAdornment={
                                <InputAdornment position="start">
                                    <Search stroke={1.5} size="16px" />
                                </InputAdornment>
                            }
                            sx={{
                                // '.MuiOutlinedInput-notchedOutline': { border: 0 }
                                '.MuiOutlinedInput-notchedOutline': {
                                    pl: 0.5,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    boxShadow: 1
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    bgcolor: '#9781810E',
                                    border: '1px solid',
                                    borderColor: 'Highlight'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    bgcolor: '#97818113',
                                    border: '1px solid',
                                    borderColor: 'divider'
                                }
                            }}
                            endAdornment={
                                <>
                                    <InputAdornment position="end" sx={{ m: 0, p: 0 }}>
                                        <MyTooltip title="Clear">
                                            <ButtonBase onClick={() => setSearchValue('')} sx={{ p: 0.3 }}>
                                                <PlaylistRemove sx={{ stroke: '1.6ex', fontSize: 20 }} />
                                            </ButtonBase>
                                        </MyTooltip>
                                    </InputAdornment>
                                </>
                            }
                            classes={{ notchedOutline: 'notchedOutline_search', root: 'notchedOutline_search' }}
                            aria-describedby="search-helper-text"
                            inputProps={{ 'aria-label': 'weight', sx: { bgcolor: 'transparent', pl: 0.5 } }}
                        />
                    </Popover>
                    <MyTooltip title="Select items" props={{ placement: 'bottom', arrow: false }}>
                        <ButtonBase
                            sx={{
                                borderRadius: '8px',
                                py: 0.7,
                                px: 0.5,
                                borderColor: 'divider',
                                borderRight: 'none',
                                ':hover': { bgcolor: 'divider' }
                            }}
                            onClick={() => setEnableSelect((prev) => !prev)}
                        >
                            <Checklist style={{ stroke: '1.6ex', fontSize: 15 }} />
                        </ButtonBase>
                    </MyTooltip>
                    <MyTooltip title="Refresh" props={{ placement: 'bottom', arrow: false }}>
                        <ButtonBase
                            sx={{
                                borderRadius: '8px',
                                py: 0.7,
                                px: 0.4,
                                // border: _index % 2 === 1 && '1px solid',
                                borderColor: 'divider',
                                borderRight: 'none',
                                ':hover': { bgcolor: 'divider' }
                            }}
                            onClick={items.toggleRefresh}
                        >
                            <Refresh sx={{ stroke: '1.6ex', fontSize: 20 }} />
                        </ButtonBase>
                    </MyTooltip>
                </Stack>
            }
        >
            <ItemsGrid 
                enableSelect={enableSelect}
                columns={columns}
                rows={filteredData}
                onDeleteSelected={HandleDelete}
                searchTerm={searchValue}
                onEdit={handleEdit}
            />
            <AddItemDialog initialItems={initialValues} openDialog={openDialog} setOpenDialog={setOpenDialog} handleSubmit={handleCreate} />
            <AddItemDialog
                openDialog={openEditDialog}
                setOpenDialog={setOpenEditDialog}
                handleSubmit={handleUpdate}
                initialItems={selectedEditItem}
            />
        </MainCard>
    );
}
