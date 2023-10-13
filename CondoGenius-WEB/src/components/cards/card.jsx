import React, { useEffect } from 'react';
import { Button, Card, CardTitle, Col, Row } from 'react-materialize';

import ModalContent from "../../components/modal/modal_content";
import FormReservations from '../../views/reservations/resident_view/form/form_reservation';

import useReservations from '../../states/reservations/hooks/useReservations';

import { useSelector } from 'react-redux';
import './card.scss';

const renderCard = (area) => (
    <Card
        className="custom-card"
        header={<CardTitle image={area.image}>{area.name}</CardTitle>}
        actions={[<Button>Realizar reserva</Button>]}
    >
        Capacidade máxima de {area.limit} pessoas
    </Card>
);

const CardContent = () => {
    const reservations = useSelector((state) => state.reservations)
    const [loadingReservations, getAreasFromReservations, getReservationsByUserId, , createReservation, createGuestList, updateGuestList, deleteReservation] = useReservations();

    useEffect(() => {
        getAreasFromReservations();
    }, []);
    
    return (
        <div className='content_card'>
            <Row>
                {reservations.areas.map((area) => (
                    <Col s={12} m={6} l={4} key={area.id}>
                        <ModalContent
                            header={`Reservar ${area.name}`}
                            trigger={renderCard(area)}
                            children={FormReservations(area)}
                            className="complaint"
                        />
                    </Col>
                ))}
            </Row>
    </div>
    );
                };

export default CardContent;
