
import axios from 'axios';

const ResidenceService = () => {
    const token = localStorage.getItem('user').token;

    const getAllResidences =  () => {
        return axios.get(`http://localhost:7008/api/residences`,
        // {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // }
        )
          .then(res => res)
          .catch(err => err);
    };

    return {
        getAllResidences
    };

};

export default ResidenceService;
