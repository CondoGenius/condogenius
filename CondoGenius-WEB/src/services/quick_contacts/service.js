
import axios from 'axios';

const QuickContactsService = () => {
    const token = localStorage.getItem('user')?.token;

    const getQuickContacts = (filters) => {
        return axios.get(`http://localhost:7008/api/quick-contacts`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
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

    const getAllQuickContacts = () => {
        return axios.get(`http://localhost:7008/api/quick-contacts/all`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        )
        .then(res => res)
        .catch(err => err);
    };

    const createQuickContactService = async (contact) => {
        return axios.post(`http://localhost:7006/api/quick-contacts`, contact, {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    return {
        getQuickContacts,
        getAllQuickContacts,
        createQuickContactService
    };

};

export default QuickContactsService;
