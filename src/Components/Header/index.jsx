import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Register from 'features/auth/Components/Register';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
    },
});

export default function Header() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <GitHubIcon />

                    <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
                        duchuynhdev
                    </Typography>
                    <nav>
                        <NavLink to="/todos" className={classes.link}>
                            <Button color="inherit">Todo</Button>
                        </NavLink>

                        <NavLink to="/counter" className={classes.link}>
                            <Button color="inherit">Counter</Button>
                        </NavLink>
                    </nav>
                    <Button color="inherit" onClick={handleClickOpen}>
                        Register
                    </Button>
                    <Dialog
                        open={open}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        disableEscapeKeyDown
                    >
                        <DialogContent>
                            <Register />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} autoFocus>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
