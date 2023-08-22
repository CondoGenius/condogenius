import React from 'react';
import { Card, Row, Col, CardTitle } from 'react-materialize';

import churrasqueira from '../../assets/churrasqueira.jpeg';
import salaoEventos from '../../assets/salaoEventos.jpeg';
import salaJogos from '../../assets/salaJogos.jpeg';

import './card.scss'


const areas = [
    { id: 1, image: churrasqueira, alt: 'Image 1', name: 'Churrasqueira', description: 'Capacidade máxima: 40 pessoas' },
    { id: 2, image: salaoEventos, alt: 'Image 2', name: 'Salão de eventos', description: 'Capacidade máxima: 100 pessoas' },
    { id: 3, image: salaJogos, alt: 'Image 3', name: 'Sala de jogos', description: 'Capacidade máxima: 25 pessoas' },
];


const CardContent = () => (
    <div className='content_card'>
        <Row>
            {areas.map((area) => (
                <Col s={12} m={6} l={4} key={area.id}>
                    <Card
                        className="custom-card"
                        header={<CardTitle image={area.image}>{area.name}</CardTitle>}
                        actions={[<a href="#">Realizar reserva</a>]}
                    >
                        {area.description}
                    </Card>
                </Col>
            ))}
        </Row>
  </div>
);

export default CardContent;
