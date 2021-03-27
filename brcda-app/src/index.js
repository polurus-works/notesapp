/**
 * File Name: index.js
 * Initializing App (brcda-app)
 * Initializing Bootstrap, Font Awesome, and React main component
 * App Name: brcda-app (configured in public/index.html)
 * Author: Subrahmanyam Poluru
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.js';
import reportWebVitals from './reportWebVitals';
import {APP_NAME} from './app/constants';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/scss/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById(APP_NAME)
);

reportWebVitals();
