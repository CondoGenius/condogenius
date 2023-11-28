
import axios from 'axios';
import { API_URL } from '../utils/vars/global';

const ResidentsService = () => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    const getResidentByCpf = (cpf) => {
        return axios.get(`${API_URL}/gateway/residents/api/residents/cpf/${cpf}`, {
            headers: {
                'ngrok-skip-browser-warning': true
            },
        })
        .then(res => res)
        .catch(err => err);
    };

    const getResidentByUserId = (userId) => {
        return axios.get(`${API_URL}/gateway/residents/api/residents/user/${userId}`, 
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

    const getResidents =  (filters) => {
        return axios.get(`${API_URL}/gateway/residents/api/residents`, 
        {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
            },
            params: {
                name: filters?.name,
                cpf: filters?.cpf,
                residence_id: filters?.residenceId
            },
        },
        )
          .then(res => res)
          .catch(err => err);
    };

    const createResident = (resident) => {
        return axios.post(`${API_URL}/gateway/residents/api/residents`, resident, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const updateResident = (resident) => {
        return axios.put(`${API_URL}/gateway/residents/api/residents/${resident.id}`, resident, {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteResident = (id) => {
        return axios.delete(`${API_URL}/gateway/residents/api/residents/${id}`, 
        {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
            },
        }
        )
          .then(res => res)
          .catch(err => err);
    };

    return {
        getResidentByCpf,
        getResidentByUserId,
        getResidents,
        createResident,
        updateResident,
        deleteResident
    };

};

export default ResidentsService;
