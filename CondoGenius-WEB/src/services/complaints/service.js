
import axios from 'axios';

const ComplaintsService = () => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;

    const getComplaintsByResindentId =  (residentId) => {
        return axios.get(`http://localhost:5000/gateway/api/complaints/resident/${residentId}`, 
        {
            headers: {
                'x-access-token': `${token}`,
            },
        },
        )
          .then(res => res)
          .catch(err => err);
    };

    const getComplaints =  () => {
        return axios.get(`http://localhost:5000/gateway/api/complaints`, 
        {
            headers: {
                'x-access-token': `${token}`,
            },
        },
        )
          .then(res => res)
          .catch(err => err);
    };

    const createComplaint = (complaint) => {
        return axios.post(`http://localhost:5000/gateway/api/complaints`, complaint, {
            headers: {
                'x-access-token': `${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const updateComplaint = (complaint) => {
        return axios.put(`http://localhost:5000/gateway/api/complaints/${complaint.id}`, complaint, {
            headers: {
                'x-access-token': `${token}`,
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteResident = (id) => {
        return axios.delete(`http://localhost:5000/gateway/api/complaints/${id}`, 
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
        getComplaintsByResindentId,
        getComplaints,
        createComplaint,
        updateComplaint,
        deleteResident
    };

};

export default ComplaintsService;
