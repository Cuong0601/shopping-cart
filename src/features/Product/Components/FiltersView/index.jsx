import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Chip, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import categoryAPI from 'api/categoryAPI';

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

const FILTER_LIST = [
    {
        id: 1,
        getLabel: (filters) => 'FREESHIP ✈',
        isActive: (filters) => filters.isFreeShip,
        isVisible: (filters) => true,
        isRemovable: false,
        onRemove: (filters) => {},
        onToggle: (filters) => {
            const newFilters = { ...filters };
            newFilters.isFreeShip = !filters.isFreeShip;
            return newFilters;
        },
    },
    {
        id: 2,
        getLabel: () => 'Khuyến mãi',
        isActive: () => true,
        isVisible: (filters) => filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            newFilters.isPromotion = false;
            return newFilters;
        },
        onToggle: () => {},
    },
    {
        id: 3,
        getLabel: (filters) => {
            let salePrice_gte = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(filters.salePrice_gte);

            let salePrice_lte = new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(filters.salePrice_lte);

            if (parseInt(salePrice_gte) > parseInt(salePrice_lte))
                [salePrice_gte, salePrice_lte] = [salePrice_lte, salePrice_gte];

            return `Từ ${salePrice_gte} đến ${salePrice_lte}`;
        },
        isActive: (filters) => true,
        isVisible: (filters) =>
            Object.keys(filters).includes('salePrice_lte') &&
            Object.keys(filters).includes('salePrice_gte'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters.salePrice_gte;
            delete newFilters.salePrice_lte;
            return newFilters;
        },
        onToggle: () => {},
    },
    {
        id: 4,
        getLabel: (filters, categoryList) => {
            const id = filters['category.id'] - 1;
            return categoryList[id].name;
        },
        isActive: (filters) => true,
        isVisible: (filters) => Object.keys(filters).includes('category.id'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters['category.id'];
            return newFilters;
        },
        onToggle: () => {},
    },
];

function FiltersView({ filters, onChange }) {
    const classes = useStyles();

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

    return (
        <Box className={classes.root}>
            <Stack direction="row" spacing={1}>
                {FILTER_LIST.filter((x) => x.isVisible(filters)).map((x) => (
                    <ThemeProvider key={x.id} theme={theme}>
                        <Chip
                            className={classes.fixed}
                            label={x.getLabel(filters, categoryList)}
                            color={x.isActive(filters) ? 'active' : 'default'}
                            clickable={!x.isRemovable}
                            onClick={
                                x.isRemovable
                                    ? null
                                    : () => {
                                          if (!onChange) return;
                                          const newFilters = x.onToggle(filters);
                                          onChange(newFilters);
                                      }
                            }
                            onDelete={
                                x.isRemovable
                                    ? () => {
                                          if (!onChange) return;
                                          const newFilters = x.onRemove(filters);
                                          onChange(newFilters);
                                      }
                                    : null
                            }
                            size="small"
                        />
                    </ThemeProvider>
                ))}
            </Stack>
        </Box>
    );
}

export default FiltersView;
