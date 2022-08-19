import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Product from '../Product';
import Grid from '@mui/material/Unstable_Grid2';

ProductList.propTypes = {
    data: PropTypes.array,
};

ProductList.defaultProps = {
    data: [],
};
function ProductList({ data }) {
    return (
        <Box padding={1}>
            <Grid container>
                {data.map((product) => (
                    <Grid key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProductList;
