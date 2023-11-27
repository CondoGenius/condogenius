
import axios from 'axios';
import { API_URL } from '../utils/vars/global';

const ReservationsService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getAreasFromReservations = async () => {
        return axios.get(`${API_URL}/gateway/api/reservations/areas`, 
        {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const getReservationsByResidentId = async (residentId) => {
        return axios.get(`${API_URL}/gateway/api/reservations/resident/${residentId}`, 
        {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const getReservations = async  () => {
        return axios.get(`${API_URL}/gateway/api/reservations`,
        {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const createReservation = async (reservation) => {
        return axios.post(`${API_URL}/gateway/api/reservations`, reservation, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const updateGuestList = async (list) => {
        return axios.post(`${API_URL}/gateway/api/reservations/guest`, list, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteFromGuestList = async (id) => {
        return axios.delete(`${API_URL}/gateway/api/reservations/guest/${id}`, {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
            },
        })
        .then(res => res)
        .catch(err => err);
    };

    const deleteReservation = async (id) => {
        return axios.delete(`${API_URL}/gateway/api/reservations/${id}`, {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
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
