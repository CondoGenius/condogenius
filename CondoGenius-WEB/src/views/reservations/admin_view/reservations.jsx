import React from "react";
import { Collection, CollectionItem } from 'react-materialize';

import { reservations } from "../../../states/reservations/mock";
import ModalContent from "../../../components/modal/modal_content";

import './reservations.scss';

import { guestList } from '../../../states/reservations/mock';

const renderGuestListFromReservation = () => (
    <Collection>
    {guestList.map(guest => (
        <CollectionItem key={guest.id}>
            <span>
            {guest.name}
            </span>
            <span className='guest_list_info'>
            {guest.document}
            </span>
        </CollectionItem>
    ))}
    </Collection>
);

const Reservations = () => {

    return (
        <>
            <div className='header_content'>
                <h1>Reservas</h1>
            </div>
            <div className='list_view'>
                <Collection>
                    <CollectionItem key="header" className='list_header'>
                        <span>Morador</span>
                        <span>Área</span>
                        <span>Data</span>
                        <span />
                    </CollectionItem>
                    {reservations.map(reservation => (
                        <CollectionItem key={reservations.id}>
                            <span>
                            {reservation.resident}
                            </span>
                            <span>
                            {reservation.name}
                            </span>
                            <span>
                            {reservation.date}
                            </span>
                            <ModalContent
                                header={`Lista de convidados - ${reservation.name} ${reservation.date}`}
                                trigger={<span className='guest_list_action'>acessar lista de convidados</span>}
                                children={renderGuestListFromReservation()}
                                className="complaint"
                            />                     
                    </CollectionItem>
                ))}
                </Collection>
            </div>
        </>
    )
};

export default Reservations;