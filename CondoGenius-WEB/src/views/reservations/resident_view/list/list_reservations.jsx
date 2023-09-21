import React from 'react';
import { Collection, CollectionItem } from 'react-materialize';

import HeaderBackPage from '../../../../components/header-back-page/header_back_page';
import { reservations } from '../../../../states/reservations/mock';
import ModalContent from "../../../../components/modal/modal_content";

import './list_reservations.scss';

const renderModalGuestList = () => (
    <div>
        
    </div>
);

const ListReservations = () => (
  <div className='header_content'>
    <HeaderBackPage route="/reservations"/>
    <h1>Minhas reservas</h1>
    <div className='list_view'>
            <Collection>
            <CollectionItem key="header" className='list_header'>
                <span>Área</span>
                <span>Data</span>
                <span />
            </CollectionItem>
            {reservations.map(reservation => (
                <CollectionItem key={reservation.id}>
                    <span>
                    {reservation.name}
                    </span>
                    <span>
                    {reservation.date}
                    </span>
                    <ModalContent
                        header={`Lista de convidados - ${reservation.name} ${reservation.date}`}
                        trigger={<span className='guest_list_action'>gerenciar lista de convidados</span>}
                        children={renderModalGuestList()}
                        className="complaint"
                    />
                </CollectionItem>
            ))}
            </Collection>
      </div>
  </div>
);

export default ListReservations;