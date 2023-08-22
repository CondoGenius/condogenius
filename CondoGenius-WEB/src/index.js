import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'materialize-css/dist/css/materialize.min.css';
import './styles/global.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    < App />
  </React.StrictMode>
);
