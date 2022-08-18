import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { store } from './app/store';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
    <StyledEngineProvider injectFirst>
        <Provider store={store}>
            <Router>
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <App />
                </SnackbarProvider>
            </Router>
        </Provider>
    </StyledEngineProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
