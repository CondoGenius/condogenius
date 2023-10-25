import React from 'react';
import { Button, Card, CardTitle, Col, Row } from 'react-materialize';

import ModalContent from "../../components/modal/modal_content";
import FormReservations from '../../views/reservations/resident_view/form/form_reservation';


import { useSelector } from 'react-redux';
import './card.scss';

const CardContent = () => {
    const reservations = useSelector((state) => state.reservations.areas);

    return (
        <div className='content_card'>
            <Row>
                {reservations?.map((area) => (
                    <Col s={12} m={6} l={4} key={area.id}>
                        <ModalContent
                            header={`Reservar ${area.name}`}
                            trigger={
                                <Card
                                    className="custom-card"
                                    header={<CardTitle image={area.image}>{area.name}</CardTitle>}
                                    actions={[<Button>Realizar reserva</Button>]}
                                >
                                    Capacidade máxima de {area.limit} pessoas
                                </Card>
                            }
                            children={FormReservations(area.id)}
                        />
                    </Col>
                ))}
            </Row>
    </div>
    );
};

export default CardContent;
