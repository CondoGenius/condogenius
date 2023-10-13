import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import CardContent from '../../../components/cards/card';

import { MdArrowForward } from 'react-icons/md';

import useReservations from '../../../states/reservations/hooks/useReservations';

import './reservations.scss';

const Reservations = () => {
  const resident = useSelector((state) => state.resident);
  const [loadingReservations, getAreasFromReservations, getReservationsByUserId, , createReservation, createGuestList, updateGuestList, deleteReservation] = useReservations();

  useEffect(() => {
    toast.error(resident.error)
  }, [resident.error]);

  return (
    <>
      <div className='header_content'>
        <h1>Reservas de áreas comuns</h1>
      </div>
      <div className='content_resident_reservation'>
        <NavLink to='/my-reservations'>
          Ir para minhas reservas <MdArrowForward />
        </NavLink>
      </div>
      <div className='areas_content'>
        { CardContent() }
      </div>
    </>
  );
};

export default Reservations;