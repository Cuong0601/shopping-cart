import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import productAPI from 'api/productAPI';
import ProductSkeletonList from 'features/Product/Components/ProductSkeletonList';
import ProductList from 'features/Product/Components/ProductList';

const useStyles = makeStyles({
    root: {},
    left: { width: '250px' },
    right: { flex: '1 1 0' },
});

function ProductListPage(props) {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fectProduct = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const reponse = await productAPI.getAll(params);
                setProductList(reponse.data);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
            setLoading(false);
        };
        fectProduct();
    }, []);

    return (
        <Box padding={1}>
            <Container>
                <Grid container spacing={1}>
                    <Grid className={classes.left}>
                        <Paper elevation={0}>Left colum</Paper>
                    </Grid>
                    <Grid className={classes.right}>
                        <Paper elevation={0}>
                            {loading ? <ProductSkeletonList /> : <ProductList data={productList} />}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ProductListPage;
