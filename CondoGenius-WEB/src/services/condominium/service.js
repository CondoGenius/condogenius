import axios from 'axios';

const CondominiumService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getInfoCondominiumByUserId = (userId) => {
        return axios.post(`http://localhost:5000/gateway/condominium/${userId}`, {
            headers: {
                'x-access-token': `${token}`,
                'Content-Type': 'application/json',
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
