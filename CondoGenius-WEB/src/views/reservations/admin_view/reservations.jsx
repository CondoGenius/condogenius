import React from "react";
import { Collection, CollectionItem } from 'react-materialize';

import { reservations } from "../../../states/reservations/mock";

import './reservations.scss';

const Reservations = () => {

    return (
        <div className='header_content'>
            <h1>Reservas</h1>
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
                            <span>
                                <a href="/">acessar lista de convidados</a>
                            </span>                        
                    </CollectionItem>
                ))}
                </Collection>
            </div>
        </div>
    )
};

export default Reservations;