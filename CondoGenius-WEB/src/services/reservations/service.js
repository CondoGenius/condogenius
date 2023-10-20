
import axios from 'axios';

const ReservationsService = () => {
    const token = localStorage.getItem('user')?.token;

    const getAreasFromReservations = async () => {
        return axios.get(`http://localhost:7006/api/reservations/areas`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const getReservationsByResidentId = async (residentId) => {
        return axios.get(`http://localhost:7006/api/reservations/resident/${residentId}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const getReservations = async  () => {
        return axios.get(`http://localhost:7006/api/reservations`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const createReservation = async (reservation) => {
        return axios.post(`http://localhost:7006/api/reservations`, reservation, {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const updateGuestList = async (list) => {
        return axios.post(`http://localhost:7006/api/guestList`, list, {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteFromGuestList = async (id) => {
        return axios.delete(`http://localhost:7006/api/guestList/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => res)
        .catch(err => err);
    };

    const deleteReservation = async (id) => {
        // lembrar de deletar tambem guestList relacionado a essa reserva
        return axios.delete(`http://localhost:7006/api/reservations/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => res)
        .catch(err => err);
    };

    return {
        getAreasFromReservations,
        getReservationsByResidentId,
        getReservations,
        createReservation,
        updateGuestList,
        deleteFromGuestList,
        deleteReservation
    };

};

export default ReservationsService;
