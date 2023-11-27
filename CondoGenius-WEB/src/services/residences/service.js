
import axios from 'axios';
import { API_URL } from '../utils/vars/global';

const ResidenceService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getAllResidences =  () => {
        return axios.get(`${API_URL}/gateway/residents/api/residences`,
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
        getAllResidences
    };

};

export default ResidenceService;
