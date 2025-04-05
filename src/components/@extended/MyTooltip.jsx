import { Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const MyTooltip = ({ children, props, title }) => {
    return (
        <Tooltip
            inputMode="email"
            slotProps={{
                arrow: { sx: { color: '#6B6B6BFF' } },
                tooltip: {
                    sx: {
                        py: 0.1,
                        border: '1px solid',
                        borderColor: 'divider'
                    }
                }
            }}
            title={title}
            {...props}
        >
            {children}
        </Tooltip>
    );
};
MyTooltip.propTypes = {
    children: PropTypes.element,
    props: PropTypes.object,
    title: PropTypes.string
};

export default MyTooltip;
