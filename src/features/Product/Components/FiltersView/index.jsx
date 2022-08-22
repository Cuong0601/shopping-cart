import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Chip, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { removeFilterCategory, removeFilterPrice, updateFilter } from '../Filter/filtersSlice';
import categoryAPI from 'api/categoryAPI';

FiltersView.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

const useStyles = makeStyles({
    root: { marginTop: '10px', marginLeft: '10px' },
    fixed: { fontWeight: 'bold', padding: 1, color: '#1A94FF' },
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

function FiltersView(props) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const filters = useSelector((state) => state.filters.current);
    // GET categoryList
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        try {
            const fetchCategory = async () => {
                const list = await categoryAPI.getAll();
                setCategoryList(
                    list.map((x) => ({
                        id: x.id,
                        name: x.name,
                    }))
                );
            };
            fetchCategory();
        } catch (error) {
            console.log('Failed to fetch Category: ', error);
        }
    }, []);

    const FILTER_FIXED = [
        {
            id: 1,
            name: 'FREESHIP ✈',
            active: Boolean(filters.isFreeShip),
            filter: () => {
                dispatch(updateFilter({ isFreeShip: !Boolean(filters.isFreeShip) }));
            },
        },
    ];
    const FILTER_UNFIXED = [
        {
            id: 1,
            name: () => 'Khuyến mãi',
            visible: Boolean(filters.isPromotion),
            cancelfilter: () => {
                dispatch(updateFilter({ isPromotion: false }));
            },
        },
        {
            id: 2,
            name: () => {
                const salePrice_gte = new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(filters.salePrice_gte);
                const salePrice_lte = new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(filters.salePrice_lte);
                return `Từ ${salePrice_gte} đến ${salePrice_lte}`;
            },
            cancelfilter: () => {
                dispatch(removeFilterPrice());
            },
            visible:
                filters.salePrice_gte === 0
                    ? true
                    : Boolean(filters.salePrice_gte) || filters.salePrice_lte === 0
                    ? true
                    : Boolean(filters.salePrice_lte),
        },
        {
            id: 3,
            name: () => {
                const catetogryID = filters['category.id'];
                const catetogryName = categoryList.map((x) =>
                    x.id === catetogryID ? x.name : null
                );
                return catetogryName;
            },
            cancelfilter: () => {
                dispatch(removeFilterCategory());
            },
            visible: Boolean(filters['category.id']),
        },
    ];

    return (
        <Box className={classes.root}>
            <Stack direction="row" spacing={1}>
                {FILTER_FIXED.map((x) => (
                    <ThemeProvider key={x.id} theme={theme}>
                        <Chip
                            className={classes.fixed}
                            label={x.name}
                            onClick={() => x.filter()}
                            color={x.active ? 'active' : 'default'}
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
                                label={x.name()}
                                onDelete={() => x.cancelfilter()}
                                size="small"
                            />
                        )
                )}
            </Stack>
        </Box>
    );
}

export default FiltersView;
