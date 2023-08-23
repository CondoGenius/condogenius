import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import RoutesConfig from './routes';

import 'materialize-css/dist/css/materialize.min.css';
import './styles/global.scss';

ReactDOM.render(
  <BrowserRouter>
    <RoutesConfig />
  </BrowserRouter>,
  document.getElementById('root')
);

