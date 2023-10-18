import React, { useEffect } from 'react';
import { MdArrowForward } from 'react-icons/md';
import { Button, Card, CardTitle, Col, Row } from 'react-materialize';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from "../../../components/loading/loading";
import ModalContent from '../../../components/modal/modal_content';
import useReservations from '../../../states/reservations/hooks/useReservations';
import FormReservations from './form/form_reservation';

import './reservations.scss';

const Reservations = () => {
  const resident = useSelector((state) => state.resident);
  const reservations = useSelector((state) => state.reservations.areas);

  const { loadingReservations, getAreasFromReservations } = useReservations();

  useEffect(() => {
    toast.error(resident.error)
  }, [resident.error]);

  useEffect(() => {
      getAreasFromReservations();
  }, []);

  return (
    <>
      <Loading
        show={
          loadingReservations
        }
      />
      <div className='header_content'>
        <h1>Reservas de áreas comuns</h1>
      </div>
      <div className='content_resident_reservation'>
        <NavLink to='/my-reservations'>
          Ir para minhas reservas <MdArrowForward />
        </NavLink>
      </div>
      <div className='areas_content'>
        { 
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
                          children={<FormReservations areaId={area.id} />}
                          className="complaint"
                      />
                  </Col>
              ))}
          </Row>
          </div>
        }
      </div>
    </>
  );
};

export default Reservations;