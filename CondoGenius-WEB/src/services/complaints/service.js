
import axios from 'axios';
import { API_URL } from '../utils/vars/global';

const ComplaintsService = () => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    const getComplaintsByResindentId =  (residentId) => {
        return axios.get(`${API_URL}/gateway/api/complaints/resident/${residentId}`, 
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

    const getComplaints =  () => {
        return axios.get(`${API_URL}/gateway/api/complaints`, 
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

    const createComplaint = (complaint) => {
        return axios.post(`${API_URL}/gateway/api/complaints`, complaint, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const updateComplaint = (complaint) => {
        return axios.put(`${API_URL}/gateway/api/complaints/${complaint.id}`, complaint, {
            headers: {
                'x-access-token': `${token}`,
                'ngrok-skip-browser-warning': true
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteResident = (id) => {
        return axios.delete(`${API_URL}/gateway/api/complaints/${id}`, 
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
        getComplaintsByResindentId,
        getComplaints,
        createComplaint,
        updateComplaint,
        deleteResident
    };

};

export default ComplaintsService;
