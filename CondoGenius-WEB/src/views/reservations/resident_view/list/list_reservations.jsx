import React, { useEffect } from 'react';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';
import HeaderBackPage from '../../../../components/header-back-page/header_back_page';
import Loading from "../../../../components/loading/loading";
import ModalContent from "../../../../components/modal/modal_content";
import useReservations from '../../../../states/reservations/hooks/useReservations';
import { FormatDateZone } from '../../../../utils/utils';
import GuestForm from './guest_form/guest_form';

import './list_reservations.scss';

const ListReservations = () => {
    const resident = useSelector((state) => state.resident)
    const { loadingReservations, getAreasFromReservations, getReservationsByUserId, deleteReservation } = useReservations();
    
    useEffect(() => {
        getAreasFromReservations();
        getReservationsByUserId(resident.data.id);
    }, []);

    const submitDeleteReservation = async(e, id) => {
        e.preventDefault();
        const response = await deleteReservation(id);
    
        if(response?.status === 200) {
            getReservationsByUserId(resident.id);
        }
    };

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
                    {resident?.reservations?.length > 0 ? (
                        resident.reservations.map(reservation => (
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
                                    children={<GuestForm list={reservation.guestList} reservationId={reservation.id} />}
                                    className="complaint"
                                />
                                <span><MdRemoveCircleOutline onClick={(e) => {submitDeleteReservation(e, reservation.id)}}/></span>
                        </CollectionItem>
                        ))
                    ) : (
                        <span className="message_not_result">Nenhuma reserva encontrada</span>
                    )}
                </Collection>
            </div>
        </>

    );
};

export default ListReservations;