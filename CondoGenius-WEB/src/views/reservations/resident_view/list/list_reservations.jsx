import React, { useEffect } from 'react';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { Button, Collection, CollectionItem } from 'react-materialize';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import HeaderBackPage from '../../../../components/header-back-page/header_back_page';
import Loading from "../../../../components/loading/loading";
import ModalContent from "../../../../components/modal/modal_content";
import useReservations from '../../../../states/reservations/hooks/useReservations';
import { FormatDateZone } from '../../../../utils/utils';
import GuestForm from './guest_form/guest_form';

import './list_reservations.scss';

const ListReservations = () => {
    const resident = useSelector((state) => state.resident)

    const { loadingReservations, getReservationsByResidentId, deleteReservation } = useReservations();

    useEffect(() => {
        getReservationsByResidentId(resident.data.id);
    }, []);


  useEffect(() => {
    toast.error(resident.error);
  }, [resident.error]);

    const submitDeleteReservation = async(e, id) => {
        e.preventDefault();
        const response = await deleteReservation(id);
    
        if(response?.status === 200) {
            toast.success("Reserva cancelada com sucesso.")
        }
        
        getReservationsByResidentId(resident.data.id);
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
                                {reservation.common_area_name}
                                </span>
                                <span>
                                {FormatDateZone(reservation.reserve_date)}
                                </span>
                                <ModalContent
                                    header={`Lista de convidados - ${reservation.common_area_name} ${FormatDateZone(reservation.reserve_date)}`}
                                    trigger={<span className='guest_list_action'>gerenciar lista de convidados</span>}
                                    children={<GuestForm guestList={reservation.guest_list} reservationId={reservation.id} />}
                                    className="complaint"
                                />
                                <ModalContent 
                                    header="Cancelar reserva"
                                    trigger={<span><MdRemoveCircleOutline /></span>}
                                    children={
                                        <span>
                                            <div>Tem certeza que deseja cancelar sua reserva para {reservation.common_area_name} no dia {FormatDateZone(reservation.reserve_date)}?</div>
                                            <div className="modal_actions_button_content">
                                                <Button modal="close" node="button" className="red_button" onClick={(e) => {submitDeleteReservation(e, reservation.id)}}>
                                                    Confirmar
                                                </Button>
                                            </div>
                                        </span>
                                    }
                                />
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