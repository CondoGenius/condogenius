
import axios from 'axios';

const HubDigitalService = () => {
    const token = localStorage.getItem('user')?.token;

    const getPublications =  () => {
        return axios.get(`http://localhost:7008/api/hub-digital`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        )
          .then(res => res)
          .catch(err => err);
    };

    const getPublicationsByUserId =  (userId) => {
        return axios.get(`http://localhost:7008/api/hub-digital/${userId}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        )
          .then(res => res)
          .catch(err => err);
    };

    const createPublication = (post) => {
        return axios.post(`http://localhost:7008/api/hub-digital`, post, {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deletePublication = (id) => {
        return axios.delete(`http://localhost:7008/api/hub-digital/${id}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        )
          .then(res => res)
          .catch(err => err);
    };

    return {
        getPublications,
        getPublicationsByUserId,
        createPublication,
        deletePublication
    };

};

export default HubDigitalService;