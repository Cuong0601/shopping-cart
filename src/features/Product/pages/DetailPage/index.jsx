import React from 'react';
import { Box, Container } from '@mui/system';
import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductThumbnail from 'features/Product/Components/ProductThumbnail';
import { useParams } from 'react-router-dom';
import useProductDetail from 'features/Product/hooks/useProductDetail';

const useStyles = makeStyles({
    root: {},
    left: { width: '400px', borderRight: '1px solid gray', padding: 10 },
    right: { flex: '1 1 0', padding: 10 },
});

function DetailPage(props) {
    const classes = useStyles();
    const { productId } = useParams();
    const { product, loading } = useProductDetail(productId);
    if (loading) return <Box>Loading when fetch product...... (update)</Box>;
    return (
        <Box>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid className={classes.left}>
                            <ProductThumbnail product={product} />
                        </Grid>
                        <Grid className={classes.right}>Product info</Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default DetailPage;
