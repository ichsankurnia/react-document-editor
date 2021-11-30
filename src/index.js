import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/style.css'
import App from './App';

import { Provider } from 'react-redux';
import configureStore from './reduxs/store/configureStore';

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);