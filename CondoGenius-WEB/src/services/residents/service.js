
import axios from 'axios';

const ResidentsService = () => {
    const token = localStorage.getItem('user').token;

    const getAllResidents =  () => {
        return axios.get(`${process.env.API_GATEWAY_URL_LOCAL}/api/residents`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const createResident = (resident) => {
        return axios.post(`${process.env.API_GATEWAY_URL_LOCAL}/api/residents`, resident, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const updateResident = (resident) => {
        return axios.put(`${process.env.API_GATEWAY_URL_LOCAL}/api/residents/${resident.id}`, resident, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteResident = (id) => {
        return axios.delete(`${process.env.API_GATEWAY_URL_LOCAL}/api/residents/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    return {
        getAllResidents,
        createResident,
        updateResident,
        deleteResident
    };

};

export default ResidentsService;
