import React, { useEffect, useMemo, useState } from 'react';
import { Box, Container } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { Pagination, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import productAPI from 'api/productAPI';
import ProductSkeletonList from 'features/Product/Components/Skeleton/ProductSkeletonList';
import ProductList from 'features/Product/Components/ProductList';
import ProductSort from 'features/Product/Components/ProductSort';
import ProductFilter from 'features/Product/Components/ProductFilter';
import FiltersView from 'features/Product/Components/FiltersView';
import { useSearchParams } from 'react-router-dom';

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

// Not use queryString.parse()
const QueryStringParse = (array) => {
    const query = [...array].reduce((previous, current) => {
        const objKey = current[0];
        let objValue;
        if (current[1] === 'true') objValue = true;
        else if (current[1] === 'false') objValue = false;
        else if (isNaN(parseInt(current[1]))) objValue = current[1];
        else objValue = parseInt(current[1]);

        return { ...previous, [objKey]: objValue };
    }, {});
    return query;
};

function ProductListPage(props) {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [pagination, setPagination] = useState({
        page: 1,
        total: 12,
        limit: 12,
    });
    const [filters] = useState({
        _page: 1,
        _limit: 12,
        _sort: 'salePrice:ASC',
    });

    const [searchParams, setSearchParams] = useSearchParams(filters);
    // when searchParams change - get queryParams
    const queryParams = useMemo(() => QueryStringParse([...searchParams]), [searchParams]);

    // Call API when queryParams change
    useEffect(() => {
        const fectProduct = async () => {
            try {
                const { data, pagination } = await productAPI.getAll(queryParams);
                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
            setLoading(false);
        };
        fectProduct();
    }, [queryParams]);

    const handlePaginationChange = (e, page) => {
        const filters = {
            ...queryParams,
            _page: page,
        };
        setSearchParams(filters);
    };

    const handleSortChange = (newValue) => {
        const filters = {
            ...queryParams,
            _sort: newValue,
        };
        setSearchParams(filters);
    };

    const handleFiltersChange = (newFilters) => {
        setSearchParams(newFilters);
    };

    return (
        <Box padding={1}>
            <Container>
                <Grid container spacing={1}>
                    <Grid className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilter filters={queryParams} onChange={handleFiltersChange} />
                        </Paper>
                    </Grid>
                    <Grid className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort
                                onChange={handleSortChange}
                                currentSort={queryParams._sort}
                            />

                            <FiltersView filters={queryParams} onChange={handleFiltersChange} />

                            {loading ? (
                                <ProductSkeletonList length={12} />
                            ) : (
                                <ProductList data={productList} />
                            )}

                            <Box className={classes.pagination}>
                                <Pagination
                                    count={Math.ceil(pagination.total / pagination.limit)}
                                    page={pagination.page}
                                    color="primary"
                                    onChange={handlePaginationChange}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ProductListPage;
