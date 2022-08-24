import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';

ProductSort.propTypes = {
    onChange: PropTypes.func,
};

function ProductSort(props) {
    const { onChange } = props;
    const [value, setValue] = useState('salePrice:ASC');

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
