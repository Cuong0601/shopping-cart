import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';

ProductSort.propTypes = {
    onChange: PropTypes.func,
    filters: PropTypes.object,
};

function ProductSort({ onChange, filters }) {
    const [value, setValue] = useState(filters._sort);

    const handleChange = (e, value) => {
        setValue(value);
    };

    useEffect(() => {
        if (onChange) onChange(value);
        // eslint-disable-next-line
    }, [value]);

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs onChange={handleChange} value={value}>
                <Tab label="GIÁ THẤP ⟶ CAO" value="salePrice:ASC"></Tab>
                <Tab label="Từ CAO ⟶ THẤP" value="salePrice:DESC" />
            </Tabs>
        </Box>
    );
}

export default ProductSort;
