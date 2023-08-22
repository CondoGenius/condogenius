import React from 'react';

import CardContent from '../cards/card';

import './reservations.scss';

const Reservations = () => (
  <div className='content_header'>
    <h1>Reservas de áreas comuns</h1>
    <div className='areas_content'>
      { CardContent() }
    </div>
  </div>
);

export default Reservations;