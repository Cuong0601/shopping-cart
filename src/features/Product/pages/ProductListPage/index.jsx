import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import productAPI from 'api/productAPI';
import ProductSkeletonList from 'features/Product/Components/Skeleton/ProductSkeletonList';
import ProductList from 'features/Product/Components/ProductList';
import ProductSort from 'features/Product/Components/ProductSort';
import ProductFilter from 'features/Product/Components/ProductFilter';
import FiltersView from 'features/Product/Components/FiltersView';
import { useDispatch, useSelector } from 'react-redux';
import ProductPagination from 'features/Product/Components/ProductPagination';
import { useSearchParams } from 'react-router-dom';
import { updateFilter } from 'features/Product/Components/Filter/filtersSlice';

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

function ProductListPage(props) {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [pagination, setPagination] = useState({
        page: 1,
        total: 12,
        limit: 12,
    });

    // ( when loadWeb with searchParams) Get searchParams and setFilters = searchParams
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters.current);
    const [searchParams, setSearchParams] = useSearchParams(filters);
    useEffect(() => {
        const filtersQuery = [...searchParams].reduce((previous, current) => {
            const objKey = current[0];
            let objValue;
            if (current[1] === 'true') objValue = true;
            else if (current[1] === 'false') objValue = false;
            else if (isNaN(parseInt(current[1]))) objValue = current[1];
            else objValue = parseInt(current[1]);

            return { ...previous, [objKey]: objValue };
        }, {});
        dispatch(updateFilter(filtersQuery));
    }, [searchParams, dispatch]);

    // If filters change
    useEffect(() => {
        const fectProduct = async () => {
            try {
                const { data, pagination } = await productAPI.getAll(filters);
                setProductList(data);
                setPagination(pagination);
                setSearchParams(filters); // Set SearchParams for website when filters change
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
            setLoading(false);
        };
        fectProduct();
    }, [filters, setSearchParams]);

    return (
        <Box padding={1}>
            <Container>
                <Grid container spacing={1}>
                    <Grid className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilter />
                        </Paper>
                    </Grid>
                    <Grid className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort />

                            <FiltersView />

                            {loading ? (
                                <ProductSkeletonList length={12} />
                            ) : (
                                <ProductList data={productList} />
                            )}

                            <ProductPagination pagination={pagination} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ProductListPage;
