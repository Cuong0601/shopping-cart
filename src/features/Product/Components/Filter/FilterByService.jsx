import React from 'react';

import PropTypes from 'prop-types';
import { Box } from '@mui/system';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { GRAY_COLOR } from 'constants/index';

FilterByService.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
};

const useStyles = makeStyles({
    root: { padding: '20px', borderTop: `1px solid ${GRAY_COLOR}` },
    range: { display: 'flex', margin: '20px 0', '& > span': { margin: '0 20px' } },
});

function FilterByService(props) {
    const classes = useStyles();
    const { onChange, filters } = props;

    const handleChange = (e) => {
        const { value, checked } = e.target;
        if (onChange) onChange({ [value]: checked });
    };

    return (
        <Box className={classes.root}>
            <Typography variant="subtitle2" fontWeight="bold">
                DỊCH VỤ
            </Typography>
            <Box className={classes.range}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox onChange={handleChange} />}
                        label="Có khuyến mãi"
                        value="isPromotion"
                        checked={Boolean(filters.isPromotion)}
                    />
                    <FormControlLabel
                        control={<Checkbox onChange={handleChange} />}
                        label="Miễn phí vận chuyển"
                        value="isFreeShip"
                        checked={Boolean(filters.isFreeShip)}
                    />
                </FormGroup>
            </Box>
        </Box>
    );
}

export default FilterByService;
