
import axios from 'axios';
import { API_URL } from '../utils/vars/global';

const QuickContactsService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getQuickContacts = (filters) => {
        return axios.get(`${API_URL}/gateway/condominium/api/fast_list`, 
        {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
            },
            params: {
                name: filters?.name,
                type: filters?.type,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const createQuickContact = async (contact) => {
        return axios.post(`${API_URL}/gateway/condominium/api/fast_list`, contact, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteQuickContact = (id) => {
        return axios.delete(`${API_URL}/gateway/condominium/api/fast_list/${id}`, 
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
        getQuickContacts,
        createQuickContact,
        deleteQuickContact
    };

};

export default QuickContactsService;
