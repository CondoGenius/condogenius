
import axios from 'axios';

const ResidentsService = () => {
    const token = localStorage.getItem('user').token;

    const getAllResidents =  () => {
        return axios.get(`http://localhost:7008/api/residents`,
        // {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // }
        )
          .then(res => res)
          .catch(err => err);
    };

    const createResident = (resident) => {
        return axios.post(`http://localhost:7008/api/residents`, resident, {
            headers: {
                // Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
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
        return axios.delete(`http://localhost:7008/api/residents/${id}`, 
        // {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // }
        )
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
