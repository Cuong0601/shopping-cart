import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import FilterByCategory from '../Filter/FilterByCategory';
import FilterByPrice from '../Filter/FilterByPrice';
import FilterByService from '../Filter/FilterByService';

ProductFilter.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

function ProductFilter(props) {
    const { onChange, filters } = props;

    const handleCategoryChange = (newCategoryID) => {
        if (!onChange) return;
        const newFilters = { 'category.id': newCategoryID };
        onChange(newFilters);
    };

    const handleChange = (newPrice) => {
        if (onChange) onChange(newPrice);
    };

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handleChange} />
            <FilterByService filters={filters} onChange={handleChange} />
        </Box>
    );
}

export default ProductFilter;
