import React from 'react';

import { Box } from '@mui/system';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GRAY_COLOR } from 'constants/index';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from './filtersSlice';

const useStyles = makeStyles({
    root: { padding: '20px', borderTop: `1px solid ${GRAY_COLOR}` },
    range: { display: 'flex', margin: '20px 0', '& > span': { margin: '0 20px' } },
});

function FilterByService(props) {
    const classes = useStyles();

    const filters = useSelector((state) => state.filters.current);
    // Handle control
    const dispatch = useDispatch();
    const handleChange = (e) => {
        return { [e.target.value]: e.target.checked };
    };
    const action = (e) => updateFilter(handleChange(e));

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2" fontWeight="bold">
                DỊCH VỤ
            </Typography>
            <Box className={classes.range}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox onChange={(e) => dispatch(action(e))} />}
                        label="Khuyến mãi"
                        value="isPromotion"
                        checked={Boolean(filters.isPromotion)}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={(e) => dispatch(action(e))} />}
                        label="FREESHIP"
                        value="isFreeShip"
                        checked={Boolean(filters.isFreeShip)}
                    />
                </FormGroup>
            </Box>
        </Box>
    );
}

export default FilterByService;
