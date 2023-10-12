
import axios from 'axios';

const ComplaintsService = () => {
    const token = localStorage.getItem('user')?.token;

    const getComplaintsByResindentId =  (residentId) => {
        return axios.get(`http://localhost:7008/api/complaints/residence/${residentId}`, 
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
        return axios.get(`http://localhost:7008/api/complaints`, 
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
        return axios.post(`http://localhost:7008/api/residents`, complaint, {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentType: 'application/json',
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const updateComplaint = (complaint) => {
        return axios.put(`http://localhost:7008/api/residents/${complaint.id}`, complaint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          })
          .then(res => res)
          .catch(err => err);
    };

    const deleteResident = (id) => {
        return axios.delete(`http://localhost:7008/api/residents/${id}`, 
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
