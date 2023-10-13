import React, { useEffect } from 'react';
import { Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';

import { MdRemoveCircleOutline } from 'react-icons/md';
import HeaderBackPage from '../../../../components/header-back-page/header_back_page';
import Loading from "../../../../components/loading/loading";
import ModalContent from "../../../../components/modal/modal_content";

import GuestForm from './guest_form/guest_form';
import './list_reservations.scss';

import useReservations from '../../../../states/reservations/hooks/useReservations';
import { FormatDateZone } from '../../../../utils/utils';

const ListReservations = () => {
    const resident = useSelector((state) => state.resident)
    const [loadingReservations, getAreasFromReservations, getReservationsByUserId, , createReservation, createGuestList, updateGuestList, deleteReservation] = useReservations();

    useEffect(() => {
        getAreasFromReservations();
        // getReservationsByUserId(resident.data.id);
    }, []);

    return (
        <>
            <Loading
                show={
                    loadingReservations
                }
            />
            <div className='header_content'>
                <HeaderBackPage route="/reservations"/>
                <h1>Minhas reservas</h1>
                </div>
            <div className='list_view'>
                <Collection>
                    <CollectionItem key="header" className='list_header'>
                        <span>Área</span>
                        <span>Data</span>
                        <span />
                        <span />
                    </CollectionItem>
                    {resident.reservations.map(reservation => (
                        <CollectionItem key={reservation.id}>
                            <span>
                            {reservation.name}
                            </span>
                            <span>
                            {FormatDateZone(reservation.date)}
                            </span>
                            <ModalContent
                                header={`Lista de convidados - ${reservation.name} ${reservation.date}`}
                                trigger={<span className='guest_list_action'>gerenciar lista de convidados</span>}
                                children={<GuestForm />}
                                className="complaint"
                            />
                            <span><MdRemoveCircleOutline /></span>
                    </CollectionItem>
                ))}
                </Collection>
            </div>
        </>

    );
};

export default ListReservations;