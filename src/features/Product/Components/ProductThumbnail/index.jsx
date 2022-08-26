import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';

ProductThumbnail.propTypes = {
    product: PropTypes.object,
};

function ProductThumbnail({ product }) {
    const thumbNailURL = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail.url}`
        : THUMBNAIL_PLACEHOLDER;
    return (
        <Box>
            <img src={thumbNailURL} alt={product.name} width="100%"></img>
        </Box>
    );
}

export default ProductThumbnail;
