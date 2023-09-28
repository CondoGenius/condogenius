import axios from 'axios';
import { useSelector } from 'react-redux';

const ResidentsService = () => {
    const user = useSelector((state => state.user.data));

    const getAllResidents = (authLogin) => {
        return axios.get(`http://localhost:5233/api/auth/login`,{
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    return {
        getAllResidents
    };

};

export default ResidentsService;
