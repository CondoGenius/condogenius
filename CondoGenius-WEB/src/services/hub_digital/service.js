
import axios from 'axios';

const HubDigitalService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getPublications =  () => {
        return axios.get(`http://localhost:7008/api/hub-digital`, 
        {
            headers: {
                'x-access-token': `${token}`,
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
                'x-access-token': `${token}`,
            },
        },
        )
          .then(res => res)
          .catch(err => err);
    };

    const createPublication = (post) => {
        return axios.post(`http://localhost:7008/api/hub-digital`, post, {
            headers: {
                'x-access-token': `${token}`,
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
                'x-access-token': `${token}`,
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