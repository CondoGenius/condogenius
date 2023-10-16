
import axios from 'axios';

const ComplaintsService = () => {
    const token = localStorage.getItem('user')?.token;

    const getComplaintsByResindentId =  (residentId) => {
        return axios.get(`http://localhost:7002/api/complaints/resident/${residentId}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        )
          .then(res => res)
          .catch(err => err);
    };

    const getComplaints =  () => {
        return axios.get(`http://localhost:7002/api/complaints`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        )
          .then(res => res)
          .catch(err => err);
    };

    const createComplaint = (complaint) => {
        return axios.post(`http://localhost:7002/api/complaints`, complaint, {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const updateComplaint = (complaint) => {
        return axios.put(`http://localhost:7002/api/complaints/${complaint.id}`, complaint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteResident = (id) => {
        return axios.delete(`http://localhost:7002/api/complaints/${id}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
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
