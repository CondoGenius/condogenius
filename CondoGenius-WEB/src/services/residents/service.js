
import axios from 'axios';

const ResidentsService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getResidentByCpf = (cpf) => {
        return axios.get(`http://localhost:5000/gateway/residents/api/residents/cpf/${cpf}`, 
        {
            headers: {
                'x-access-token': `${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const getResidentByUserId = (userId) => {
        return axios.get(`http://localhost:5000/gateway/residents/api/residents/id/${userId}`, 
        {
            headers: {
                'x-access-token': `${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const getResidents =  (filters) => {
        return axios.get(`http://localhost:5000/gateway/residents/api/residents`, 
        {
            headers: {
                'x-access-token': `${token}`,
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
        return axios.post(`http://localhost:5000/gateway/residents/api/residents`, resident, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const updateResident = (resident) => {
        return axios.put(`http://localhost:5000/gateway/residents/api/residents/${resident.id}`, resident, {
            headers: {
                'x-access-token': `${token}`,
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteResident = (id) => {
        return axios.delete(`http://localhost:5000/gateway/residents/api/residents/${id}`, 
        {
            headers: {
                'x-access-token': `${token}`,
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
