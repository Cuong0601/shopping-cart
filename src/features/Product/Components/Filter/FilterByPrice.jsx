import React from 'react';
import { useState } from 'react';

import { Box } from '@mui/system';
import { Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GRAY_COLOR } from 'constants/index';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from './filtersSlice';
import { useEffect } from 'react';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
        />
    );
});

const useStyles = makeStyles({
    root: { padding: '20px', borderTop: `1px solid ${GRAY_COLOR}` },
    range: { display: 'flex', margin: '10px 0', '& > span': { margin: '0 20px' } },
    smallTextFiledInput: {
        padding: '3px',
        fontSize: '14px',
    },
});

function FilterByPrice(props) {
    const classes = useStyles();

    const filters = useSelector((state) => state.filters.current);
    useEffect(() => {
        const priceGte = filters.salePrice_gte === undefined ? 0 : filters.salePrice_gte;
        const priceLte = filters.salePrice_lte === undefined ? 0 : filters.salePrice_lte;
        setValues({
            salePrice_gte: priceGte,
            salePrice_lte: priceLte,
        });
    }, [filters.salePrice_gte, filters.salePrice_lte]);

    // Handle textField
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    });
    const handlePriceChange = (e) => {
        const { value, name } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Handle sumbit
    const dispatch = useDispatch();
    const handleChange = (e) => values;
    const action = (e) => updateFilter(handleChange(e));

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2" fontWeight="bold">
                CHỌN KHOẢNG GIÁ
            </Typography>
            <Box className={classes.range}>
                <TextField
                    variant="outlined"
                    name="salePrice_gte"
                    value={values.salePrice_gte}
                    onChange={handlePriceChange}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                        classes: {
                            input: classes.smallTextFiledInput,
                        },
                    }}
                ></TextField>
                <Typography sx={{ mx: '5px' }}>-</Typography>
                <TextField
                    variant="outlined"
                    name="salePrice_lte"
                    value={values.salePrice_lte}
                    onChange={handlePriceChange}
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                        classes: {
                            input: classes.smallTextFiledInput,
                        },
                    }}
                ></TextField>
            </Box>
            <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={(e) => dispatch(action(e))}
            >
                Áp dụng
            </Button>
        </Box>
    );
}

export default FilterByPrice;
