// project import
import MainCard from 'components/MainCard';
import { clientColumns, clientRows } from 'contexts/auth-reducer/data';
import { Avatar, ButtonBase, InputAdornment, OutlinedInput, Popover } from '@mui/material';
import { AddCircle, PlaylistRemove, Refresh, Search } from '@mui/icons-material';
import { Stack } from '@mui/system';
import React from 'react';
import { ItemsGrid } from 'pages/Items/ItemsGrid';
import { AddItemDialog } from 'pages/Items/addItem';
import MyTooltip from 'components/@extended/MyTooltip';

// ==============================|| SAMPLE PAGE ||============================== //

export default function ClientRecord() {
    const [searchValue, setSearchValue] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const filteredData = clientRows
        .map((params) => ({ ...params }))
        .filter((item) =>
            clientColumns.some(
                (col) => item[col.field] != null && item[col.field].toString().toLowerCase().includes(searchValue.toString().toLowerCase())
            )
        );

    return (
        <MainCard
            title={
                <>
                    Account
                    <MyTooltip title="Add New Account" props={{ placement: 'bottom', arrow: false }}>
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
                            // onClick={payment.toggleRefresh}
                        >
                            <Refresh sx={{ stroke: '1.6ex', fontSize: 20 }} />
                        </ButtonBase>
                    </MyTooltip>
                </Stack>
            }
        >
            <ItemsGrid columns={clientColumns} rows={filteredData} />
            <AddItemDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </MainCard>
    );
}
