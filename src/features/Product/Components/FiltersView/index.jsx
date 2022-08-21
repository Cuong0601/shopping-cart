import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Chip, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

FiltersView.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

const useStyles = makeStyles({
    root: { marginTop: '10px', marginLeft: '10px' },
    fixed: { fontWeight: 'bold', padding: 1 },
    unfixed: { padding: 1 },
});

const theme = createTheme({
    palette: {
        active: {
            main: '#1ba8ff1a',
            contrastText: '#1A94FF',
        },
    },
});

const FILTER_FIXED = [
    {
        id: 1,
        name: 'FREESHIP',
        active: true,
    },
];
const FILTER_UNFIXED = [
    {
        id: 1,
        name: 'Khuyến mãi',
        // visible: Boolean(filters.isPromotion),
    },
    {
        id: 2,
        name: 'Từ 0đ đến 0đ',
        visible: false,
    },
    {
        id: 3,
        name: 'Danh mục',
        visible: false,
    },
];

function FiltersView(props) {
    const classes = useStyles();
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleDelete = () => {
        console.info('You click delete icon.');
    };
    return (
        <Box className={classes.root}>
            <Stack direction="row" spacing={1}>
                {FILTER_FIXED.map((x) => (
                    <ThemeProvider key={x.id} theme={theme}>
                        <Chip
                            className={classes.fixed}
                            label={x.name}
                            onClick={handleClick}
                            color="active"
                            size="small"
                        />
                    </ThemeProvider>
                ))}
                {FILTER_UNFIXED.map(
                    (x) =>
                        x.visible && (
                            <Chip
                                className={classes.unfixed}
                                key={x.id}
                                label={x.name}
                                onDelete={handleDelete}
                                size="small"
                            />
                        )
                )}
            </Stack>
        </Box>
    );
}

export default FiltersView;
