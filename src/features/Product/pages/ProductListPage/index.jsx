import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { Pagination, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import productAPI from 'api/productAPI';
import ProductSkeletonList from 'features/Product/Components/ProductSkeletonList';
import ProductList from 'features/Product/Components/ProductList';

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
    const [filters, setFilters] = useState({ _page: 1, _limit: 12 });

    useEffect(() => {
        const fectProduct = async () => {
            try {
                const { data, pagination } = await productAPI.getAll(filters);

                setProductList(data);
                setPagination(pagination);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
            setLoading(false);
        };
        fectProduct();
    }, [filters]);

    const handlePaginationChange = (e, page) => {
        setFilters((prevFilter) => ({
            ...prevFilter,
            _page: page,
        }));
    };

    return (
        <Box padding={1}>
            <Container>
                <Grid container spacing={1}>
                    <Grid className={classes.left}>
                        <Paper elevation={0}>Left colum</Paper>
                    </Grid>
                    <Grid className={classes.right}>
                        <Paper elevation={0}>
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