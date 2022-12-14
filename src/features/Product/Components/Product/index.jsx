import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import { useNavigate } from 'react-router-dom';

Product.propTypes = {
    product: PropTypes.object,
};

Product.defaultProps = {
    product: [],
};

function Product({ product }) {
    const thumbNailURL = product.thumbnail
        ? `${STATIC_HOST}${product.thumbnail.url}`
        : THUMBNAIL_PLACEHOLDER;

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/product/${product.id}`);
    };
    return (
        <Box sx={{ px: 1, pb: 1 }} minHeight="198px" onClick={handleClick}>
            <Box>
                <img src={thumbNailURL} alt={product.name} width="100%"></img>
            </Box>

            <Typography variant="body2">{product.name}</Typography>
            <Typography variant="body2">
                <Box component="span" sx={{ fontSize: '16px', fontWeight: 'bold', mr: 1 }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        product.salePrice
                    )}
                </Box>
                {product.promotionPercent > 0 ? `-${product.promotionPercent}%` : ''}
            </Typography>
        </Box>
    );
}

export default Product;
