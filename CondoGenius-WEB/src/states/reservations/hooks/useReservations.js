import { useState } from 'react';
import { useDispatch } from "react-redux";
import ReservationsService from '../../../services/reservations/service';

import { setReservationsAction } from '../../../store/reservations/actions';
import { setResidentReservationsAction } from "../../../store/resident/actions";

const useReservations = () => {
    const dispatch = useDispatch();
    const [loadingReservations, setLoadingReservations] = useState(false);

    const getAreasFromReservations = async () => {
        setLoadingReservations(true);

        const response = await ReservationsService().getAreasFromReservations();
        
        if (response?.status === 200) {
            dispatch(setReservationsAction({ areas: response.data }));
        } else {
            dispatch(setResidentReservationsAction({ error: "Erro ao listar áreas."}));
        }

        setLoadingReservations(false);
        return response;
    };

    const getReservationsByResidentId = async (residentId) => {
        setLoadingReservations(true);

        const response = await ReservationsService().getReservationsByResidentId(residentId);

        if (response?.status === 200) {
            dispatch(setResidentReservationsAction({ reservations: response.data }));
        } else {
            dispatch(setResidentReservationsAction({ error: "Erro ao listar suas reservas."}));
        }

        setLoadingReservations(false);
        return response;
    };

    const getReservations = async () => {
        setLoadingReservations(true);

        const response = await ReservationsService().getReservations();

        if (response?.status === 200) {
            dispatch(setReservationsAction({ list: response.data }));
        } else {
            dispatch(setReservationsAction({ error: "Erro ao listar reservas."}));
        }

        setLoadingReservations(false);
        return response;
    };

    const createReservation = async (values) => {
        setLoadingReservations(true);

        const reservation = {
            resident_id: values.residentId,
            area_id: values.areaId,
            type: values.type,
            date: values.date
        };

        const response = await ReservationsService().createReservation(reservation);

        if (response?.status !== 201) {
            dispatch(setResidentReservationsAction({ error: "Erro ao cadastrar reserva." }));
        }

        setLoadingReservations(false);
        return response;
    };

    const updateGuestList = async (values) => {
        setLoadingReservations(false);

        const guestList = {
            reserve_id: values.reservationId,
            name: values.name,
            cpf: values.cpf,
        };

        const response = await ReservationsService().updateGuestList(guestList);

        if (response?.status !== 201) {
            dispatch(setResidentReservationsAction({ error: "Erro ao atualiazar lista de convidados." }));
        }

        setLoadingReservations(false);
        return response;
    };

    const deleteFromGuestList = async (id) => {
        setLoadingReservations(false);

        const response = await ReservationsService().deleteFromGuestList(id);

        if (response?.status !== 200) {
            dispatch(setResidentReservationsAction({ error: "Erro ao remover convidado." }));
        }

        setLoadingReservations(false);
        return response;
    };

    const deleteReservation = async (id) => {
        setLoadingReservations(false);

        const response = await ReservationsService().deleteReservation(id);

        if (response?.status !== 200) {
            dispatch(setResidentReservationsAction({ error: "Erro ao deletar reserva." }));
        }
        
        setLoadingReservations(false);
        return response;
    };
    

    return {
        loadingReservations,
        getAreasFromReservations,
        getReservationsByResidentId,
        getReservations,
        createReservation,
        updateGuestList,
        deleteFromGuestList,
        deleteReservation
    };

};

export default useReservations;