
import axios from 'axios';

const ReservationsService = () => {
    const token = localStorage.getItem('user')?.token;

    const getAreasFromReservations = async () => {
        return axios.get(`http://localhost:7003/api/reservations/areas`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const getReservationsByUserId = async (userId) => {
        // return {id, list, guestList}
        return axios.get(`http://localhost:7003/api/reservations/user/${userId}`, 
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
        return axios.get(`http://localhost:7003/api/reservations`,
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
        return axios.post(`http://localhost:7003/api/reservations`, reservation, {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const createGuestList = async (guestList) => {
        return axios.post(`http://localhost:7003/api/reservations`, guestList, {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const updateGuestList = async (list) => {
        return axios.post(`http://localhost:7003/api/reservations`, list, {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteReservation = async (id) => {
        // lembrar de deletar tambem guestList relacionado a essa reserva
        return axios.put(`http://localhost:7003/api/deliveries/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => res)
        .catch(err => err);
    };

    return {
        getAreasFromReservations,
        getReservationsByUserId,
        getReservations,
        createReservation,
        createGuestList,
        updateGuestList,
        deleteReservation
    };

};

export default ReservationsService;
