
import axios from 'axios';

const ResidenceService = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const getAllResidences =  () => {
        return axios.get(`http://localhost:5000/gateway/residents/api/residences`,
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
        getAllResidences
    };

};

export default ResidenceService;
