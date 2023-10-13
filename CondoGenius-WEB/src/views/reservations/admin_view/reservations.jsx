import React, { useEffect } from "react";
import { Collection, CollectionItem } from 'react-materialize';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

import Loading from "../../../components/loading/loading";
import ModalContent from "../../../components/modal/modal_content";

import useReservations from "../../../states/reservations/hooks/useReservations";
import './reservations.scss';

const renderGuestListFromReservation = (guestList) => (
    <Collection>
    {guestList.length > 0 ? (
        guestList.map(guest => (
            <CollectionItem key={guest.id}>
                <span>
                {guest.name}
                </span>
                <span className='guest_list_info'>
                {guest.document}
                </span>
            </CollectionItem>
        ))
    ) : (
        <span className="message_not_result">Nenhum convidado cadastrado</span>
    )
    }
    </Collection>
);

const Reservations = () => {
    const reservations = useSelector((state) => state.reservations);

    const [loadingReservations, getAreasFromReservations, getReservationsByUserId, getReservations, createReservation, createGuestList, updateGuestList, deleteReservation] = useReservations();

    useEffect(() => {
        getReservations();
    },[]);

    useEffect(() => {
        toast.error(reservations.error)
      }, [reservations.error]);

    return (
        <>
            <Loading
                show={
                    loadingReservations
                }
            />
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
                    {reservations.list?.length > 0 ? (
                        reservations.list.map(reservation => (
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
                                    children={renderGuestListFromReservation(reservation.guestList)}
                                    className="complaint"
                                />                     
                        </CollectionItem>
                    ))
                    ) : (
                        <span className="message_not_result">Nenhuma reserva encontrada</span>
                    )}
                </Collection>
            </div>
        </>
    )
};

export default Reservations;