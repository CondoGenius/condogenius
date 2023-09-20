import React from 'react';
import { Collection, CollectionItem } from 'react-materialize';

import HeaderBackPage from '../../../components/header-back-page/header_back_page';
import { reservations } from '../../../states/reservations/mock';

import './list_reservations.scss';

const ListReservations = () => (
  <div className='header_content'>
    <HeaderBackPage route="/reservations"/>
    <h1>Minhas reservas</h1>
    <div className='list_view'>
            <Collection>
            <CollectionItem key="header" className='list_header'>
                <span>Área</span>
                <span>Data</span>
                <span>Lista de convidados</span>
            </CollectionItem>
            {reservations.map(reservation => (
                <CollectionItem key={reservation.id}>
                    <span>
                    {reservation.name}
                    </span>
                    <span>
                    {reservation.date}
                    </span>
                    <span></span>
                </CollectionItem>
            ))}
            </Collection>
      </div>
  </div>
);

export default ListReservations;