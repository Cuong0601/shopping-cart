import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';

ProductSort.propTypes = {
    currentSort: PropTypes.string,
    onChange: PropTypes.func,
};

function ProductSort(props) {
    const { onChange, currentSort } = props;
    const handleChange = (e, value) => {
        if (onChange) onChange(e, value);
    };
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs onChange={handleChange} value={currentSort}>
                <Tab label="GIÁ THẤP ⟶ CAO" value="salePrice:ASC"></Tab>
                <Tab label="Từ CAO ⟶ THẤP" value="salePrice:DESC" />
            </Tabs>
        </Box>
    );
}

export default ProductSort;
