import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import FilterByCategory from '../Filter/FilterByCategory';

ProductFilter.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

function ProductFilter(props) {
    const { filters, onChange } = props;

    const handleCategoryChange = (newCategoryID) => {
        if (!onChange) return;
        const newFilters = { ...filters, 'category.id': newCategoryID };
        onChange(newFilters);
    };
    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
        </Box>
    );
}

export default ProductFilter;
