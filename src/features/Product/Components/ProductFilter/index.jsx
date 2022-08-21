import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import FilterByCategory from '../Filter/FilterByCategory';
import FilterByPrice from '../Filter/FilterByPrice';

ProductFilter.propTypes = {
    onChange: PropTypes.func,
};

function ProductFilter(props) {
    const { onChange } = props;

    const handleCategoryChange = (newCategoryID) => {
        if (!onChange) return;
        const newFilters = { 'category.id': newCategoryID };
        onChange(newFilters);
    };

    const handlePriceChange = (newPrice) => {
        if (onChange) onChange(newPrice);
    };

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
            <FilterByPrice onChange={handlePriceChange} />
        </Box>
    );
}

export default ProductFilter;
