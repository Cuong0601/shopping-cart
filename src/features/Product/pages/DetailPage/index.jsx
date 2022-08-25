import React from 'react';
import { Box, Container } from '@mui/system';
import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {},
    left: { width: '400px', borderRight: '1px solid gray', padding: 1 },
    right: { flex: '1 1 0', padding: 1 },
});

function DetailPage(props) {
    const classes = useStyles();
    return (
        <Box>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid className={classes.left}>Thumbnail</Grid>
                        <Grid className={classes.right}>Product info</Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default DetailPage;
