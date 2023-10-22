
import axios from 'axios';

const ReservationsService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getAreasFromReservations = async () => {
        return axios.get(`http://localhost:5000/gateway/api/reservations/areas`, 
        {
            headers: {
                'x-access-token': `${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const getReservationsByResidentId = async (residentId) => {
        return axios.get(`http://localhost:5000/gateway/api/reservations/resident/${residentId}`, 
        {
            headers: {
                'x-access-token': `${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const getReservations = async  () => {
        return axios.get(`http://localhost:5000/gateway/api/reservations`,
        {
            headers: {
                'x-access-token': `${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const createReservation = async (reservation) => {
        return axios.post(`http://localhost:5000/gateway/api/reservations`, reservation, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const updateGuestList = async (list) => {
        return axios.post(`http://localhost:5000/gateway/api/reservations/guest`, list, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteFromGuestList = async (id) => {
        return axios.delete(`http://localhost:5000/gateway/api/reservations/guest/${id}`, {
            headers: {
                'x-access-token': `${token}`,
            },
        })
        .then(res => res)
        .catch(err => err);
    };

    const deleteReservation = async (id) => {
        return axios.delete(`http://localhost:5000/gateway/api/reservations/${id}`, {
            headers: {
                'x-access-token': `${token}`,
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
