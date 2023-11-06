
import axios from 'axios';

const QuickContactsService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getQuickContacts = (filters) => {
        return axios.get(`http://localhost:5000/gateway/condominium/api/fast_list`, 
        {
            headers: {
                'x-access-token': `${token}`,
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
        return axios.post(`http://localhost:5000/gateway/condominium/api/fast_list`, contact, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteQuickContact = (id) => {
        return axios.delete(`http://localhost:5000/gateway/condominium/api/fast_list/${id}`, 
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
        getQuickContacts,
        createQuickContact,
        deleteQuickContact
    };

};

export default QuickContactsService;
