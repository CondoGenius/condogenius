
import axios from 'axios';
import { API_URL } from '../utils/vars/global';

const DeliveriesService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getDeliveriesByResidenceId = async (residenceId) => {
        return axios.get(`${API_URL}/gateway/api/deliveries/residence/${residenceId}`, 
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

    const getDeliveries = async  () => {
        return axios.get(`${API_URL}/gateway/api/deliveries`, 
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

    const createDelivery = async (delivery) => {
        return axios.post(`${API_URL}/gateway/api/deliveries`, delivery, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const updateDelivery = async (id) => {
        return axios.put(`${API_URL}/gateway/api/deliveries/${id}`, id,  {
            headers: {
                'x-access-token': `${token}`,
            },
        })
        .then(res => res)
        .catch(err => err);
    };

    return {
        getDeliveriesByResidenceId,
        getDeliveries,
        createDelivery,
        updateDelivery
    };

};

export default DeliveriesService;
