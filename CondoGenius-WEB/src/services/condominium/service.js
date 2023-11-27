import axios from 'axios';
import { API_URL } from '../utils/vars/global';

const CondominiumService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getInfoCondominiumByUserId = (userId) => {
        return axios.get(`${API_URL}/gateway/condominium/api/condominium/${userId}`, {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
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
