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
import DialogContent from '@mui/material/DialogContent';
import Login from 'features/auth/Components/Login';
import Register from 'features/auth/Components/Register';
import { IconButton } from '@mui/material';
import { AccountCircle, Close } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #F8F9FC 30%, #FFFFFF 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)',
        color: 'black',
    },
    link: {
        color: 'black',
        textDecoration: 'none',
    },
    closebtn: {
        position: 'absolute',
        right: '4px',
        top: '10px',
    },
});

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
};

export default function Header() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const loggedInUser = useSelector((state) => state.user.current);
    const isLoggedIn = !!loggedInUser.id;

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setMode(MODE.LOGIN);
    };

    const handleUserClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={classes.root}>
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

                    {!isLoggedIn && (
                        <Button color="inherit" onClick={handleClickOpen}>
                            Login
                        </Button>
                    )}

                    {isLoggedIn && (
                        <IconButton color="inherit">
                            <AccountCircle />
                        </IconButton>
                    )}

                    <Dialog
                        open={open}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        disableEscapeKeyDown
                    >
                        <IconButton onClick={handleClose} className={classes.closebtn}>
                            <Close />
                        </IconButton>
                        <DialogContent>
                            {mode === MODE.LOGIN && (
                                <>
                                    <Login closeDialog={handleClose} />
                                    <Box textAlign="center">
                                        <Button
                                            color="primary"
                                            onClick={() => setMode(MODE.REGISTER)}
                                        >
                                            Dont have an account. Register here
                                        </Button>
                                    </Box>
                                </>
                            )}
                            {mode === MODE.REGISTER && (
                                <>
                                    <Register closeDialog={handleClose} />
                                    <Box textAlign="center">
                                        <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                                            Already have an account. Login here
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </DialogContent>
                    </Dialog>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
