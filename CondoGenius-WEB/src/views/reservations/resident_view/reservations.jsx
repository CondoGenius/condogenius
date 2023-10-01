import React from 'react';
import { NavLink } from 'react-router-dom';

import CardContent from '../../../components/cards/card';

import { MdArrowForward } from 'react-icons/md';

import './reservations.scss';

const Reservations = () => (
  <>
    <div className='header_content'>
      <h1>Reservas de áreas comuns</h1>
    </div>
    <div className='content_resident_reservation'>
      <NavLink to='/my-reservations'>
        Ir para minhas reservas <MdArrowForward />
      </NavLink>
    </div>
    <div className='areas_content'>
      { CardContent() }
    </div>
  </>
);

export default Reservations;