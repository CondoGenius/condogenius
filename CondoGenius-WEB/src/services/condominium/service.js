import axios from 'axios';

const CondominiumService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getInfoCondominiumByUserId = (userId) => {
        return axios.get(`http://localhost:5000/gateway/condominium/api/condominium/${userId}`, {
            headers: {
                'x-access-token': `${token}`,
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    return {
        getInfoCondominiumByUserId
    };

};

export default CondominiumService;
