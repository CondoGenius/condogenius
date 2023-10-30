
import axios from 'axios';

const DeliveriesService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getDeliveriesByResidenceId = async (residenceId) => {
        return axios.get(`http://localhost:7003/api/deliveries/residence/${residenceId}`, 
        {
            headers: {
                'x-access-token': `${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const getDeliveries = async  () => {
        return axios.get(`http://localhost:7003/api/deliveries`, 
        {
            headers: {
                'x-access-token': `${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const createDelivery = async (delivery) => {
        return axios.post(`http://localhost:7003/api/deliveries`, delivery, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const updateDelivery = async (id) => {
        return axios.put(`http://localhost:7003/api/deliveries/${id}`, {
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
