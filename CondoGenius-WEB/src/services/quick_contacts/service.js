
import axios from 'axios';

const QuickContactsService = () => {
    const token = localStorage.getItem('user')?.token;

    const getQuickContacts = () => {
        return axios.get(`http://localhost:7008/api/quick-contacts`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
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

    return {
        getQuickContacts,
        getAllQuickContacts
    };

};

export default QuickContactsService;
