import React from 'react';
import { Box, Pagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../Filter/filtersSlice';
import PropTypes from 'prop-types';

ProductPagination.propTypes = {
    pagination: PropTypes.object,
};

const useStyles = makeStyles({
    root: {},
    left: { width: '250px' },
    right: { flex: '1 1 0' },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '30px',
    },
});

function ProductPagination({ pagination = {} }) {
    const classes = useStyles();
    // Handle control
    const dispatch = useDispatch();
    const handleChange = (e, value) => ({ _page: value });
    const action = (e, value) => updateFilter(handleChange(e, value));

    return (
        <Box className={classes.pagination}>
            <Pagination
                count={Math.ceil(pagination.total / pagination.limit)}
                page={pagination.page}
                color="primary"
                onChange={(e, value) => dispatch(action(e, value))}
            />
        </Box>
    );
}

export default ProductPagination;
