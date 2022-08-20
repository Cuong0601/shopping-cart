import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import categoryAPI from 'api/categoryAPI';
import { makeStyles } from '@mui/styles';
import { HOVER_COLOR } from 'constants/index';

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
};

const useStyles = makeStyles({
    root: { padding: 20 },
    menu: {
        listStyle: 'none',
        padding: 0,
        '& > li': {
            padding: 2,
            margin: '10px 0',
            '&:hover': {
                transition: 'all 0.2s',
                cursor: 'pointer',
                color: 'darkslateblue',
                backgroundColor: HOVER_COLOR,
            },
        },
    },
});

function FilterByCategory({ onChange }) {
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
    const handleCategoryClick = (category) => {
        if (onChange) onChange(category.id);
    };

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle1" fontWeight="bold">
                DANH MỤC SẢN PHẨM
            </Typography>
            <ul className={classes.menu}>
                {categoryList.map((category) => (
                    <li key={category.id} onClick={() => handleCategoryClick(category)}>
                        <Typography variant="body1"> {category.name}</Typography>
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FilterByCategory;
