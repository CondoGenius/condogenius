import React from 'react';
import { Card, Row, Col, CardTitle, Button } from 'react-materialize';

import ModalContent from "../../components/modal/modal_content";
import FormReservations from '../../views/reservations/resident_view/form/form_reservation';
import { areas } from '../../states/reservations/mock';

import './card.scss';

const renderCard = (area) => (
    <Card
        className="custom-card"
        header={<CardTitle image={area.image}>{area.name}</CardTitle>}
        actions={[<a href="#">Realizar reserva</a>]}
    >
        Capacidade máxima de {area.limit} pessoas
    </Card>
);

const CardContent = () => (
    <div className='content_card'>
        <Row>
            {areas.map((area) => (
                <Col s={12} m={6} l={4} key={area.id}>
                    
                    <ModalContent
                        header={`Reservar ${area.name}`}
                        trigger={renderCard(area)}
                        children={FormReservations()}
                        className="complaint"
                    />
                </Col>
            ))}
        </Row>
  </div>
);

export default CardContent;
