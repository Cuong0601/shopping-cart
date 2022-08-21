import React from 'react';
import { Box } from '@mui/system';
import FilterByCategory from '../Filter/FilterByCategory';
import FilterByPrice from '../Filter/FilterByPrice';
import FilterByService from '../Filter/FilterByService';

function ProductFilter(props) {
    return (
        <Box>
            <FilterByCategory />
            <FilterByPrice />
            <FilterByService />
        </Box>
    );
}

export default ProductFilter;
