import React, { useEffect } from "react";
import { Collection, CollectionItem } from 'react-materialize';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Loading from "../../../components/loading/loading";
import ModalContent from "../../../components/modal/modal_content";
import useReservations from "../../../states/reservations/hooks/useReservations";
import { CpfMask, FormatDateZone } from "../../../utils/utils";
import './reservations.scss';

const renderGuestListFromReservation = (guestList) => (
    <Collection>
    {guestList?.length > 0 ? (
        guestList.map(guest => (
            <CollectionItem key={guest.id}>
                <span>
                {guest.name}
                </span>
                <span className='guest_list_info'>
                {CpfMask(guest.cpf)}
                </span>
            </CollectionItem>
        ))
    ) : (
        <span className="message_not_result">Nenhum convidado cadastrado</span>
    )
    }
    </Collection>
);

const ReservationsAdminView = () => {
    const reservations = useSelector((state) => state.reservations);

    const { loadingReservations, getReservations } = useReservations();

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
                                {`${reservation.resident_name} ${reservation.resident_last_name}`}
                                </span>
                                <span>
                                {reservation.common_area_name}
                                </span>
                                <span>
                                {FormatDateZone(reservation.reserve_date)}
                                </span>
                                <ModalContent
                                    header={`Lista de convidados - ${reservation.common_area_name} ${FormatDateZone(reservation.reserve_date)}`}
                                    trigger={<span className='guest_list_action'>acessar lista de convidados</span>}
                                    children={renderGuestListFromReservation(reservation.guest_list)}
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

export default ReservationsAdminView;