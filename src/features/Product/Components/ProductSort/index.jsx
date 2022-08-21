import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../Filter/filtersSlice';

function ProductSort(props) {
    // Handle control
    const filters = useSelector((state) => state.filters.current);
    const dispatch = useDispatch();
    const handleChange = (e, value) => ({ _sort: value });
    const action = (e, value) => updateFilter(handleChange(e, value));

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs onChange={(e, value) => dispatch(action(e, value))} value={filters._sort}>
                <Tab label="GIÁ THẤP ⟶ CAO" value="salePrice:ASC"></Tab>
                <Tab label="Từ CAO ⟶ THẤP" value="salePrice:DESC" />
            </Tabs>
        </Box>
    );
}

export default ProductSort;
