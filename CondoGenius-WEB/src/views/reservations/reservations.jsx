import React from 'react';
import { NavLink } from 'react-router-dom';

import CardContent from '../../components/cards/card';
import ModalContent from '../../components/modal/modal_content';

import { MdArrowForward } from 'react-icons/md';

import './reservations.scss';

const Reservations = () => (
  <div className='header_content'>
    <h1>Reservas de áreas comuns</h1>
    <div className='content_resident_reservation'>
      <NavLink to='/list-resident-reservations'>
        Ir para minhas reservas <MdArrowForward />
      </NavLink>
    </div>
    <div className='areas_content'>
      { CardContent() }
    </div>
  </div>
);

export default Reservations;